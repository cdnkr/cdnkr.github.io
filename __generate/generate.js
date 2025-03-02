import fs from 'fs/promises';
import path from 'path';
import esbuild from 'esbuild';
import { exec } from 'child_process';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

// import { compile } from '@mdx-js/mdx';

import HtmlDocument from './pages/html.jsx';
import HomeTemplate from './pages/template.jsx';
import ArticleTemplate from './pages/article/template.jsx';

import { processTailwind } from './tailwind.js';
import config from './config.js';

async function parseArticles(articleFiles) {    
    articleFiles = articleFiles.map(file => file?.replace('.md', ''));

    const articles = [];

    for (let articleFileName of articleFiles) {
        const articleContent = await fs.readFile(path.join('./articles', `${articleFileName}.md`), 'utf8');

        const [articleMeta, ...sections] = articleContent.split('---');

        const articleMetaParsed = articleMeta.trim().split('\n').reduce((acc, line) => {
            const [key, value] = line.split(':');
            acc[key.trim()] = value.trim();
            return acc;
        }, {});

        let sectionTitles = [];
        let sectionsHTML = [];

        for (let section of sections) {
            section = section?.trim();

            if (!section) continue;

            const title = `${encodeURIComponent(section.split('\n')[0].replace(/##|###/g, '').trim())}`;
            const content = section.split('\n').slice(1).join('\n').trim();

            sectionTitles.push(title);

            const marked = await import('marked');

            const parsed = marked.parse(content);

            // Convert MDX to React components
            // const compiled = await compile(marked.default(content), {
            //     jsx: true,
            //     // Add any MDX plugins you want here
            // });

            // Store the compiled MDX
            sectionsHTML.push(parsed);
        }

        articles.push({
            ...articleMetaParsed,
            title: articleFileName,
            sectionTitles: sectionTitles,
            sections: sectionsHTML
        });
    }

    return articles;
}

function gitCommitAndPush() {
    exec(`cd ../ && git add . && git commit -m "${config.commitMessage}" && git push`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Error: ${stderr}`);
            return;
        }
        console.log(`Git add and commit completed: ${stdout}`);
    });
}

async function generatePage({ 
    template,
    initialProps,
    hydrateScriptSrc,
    dirOffset,
    title,
    description,
    keywords,
    hydrateEntryPoint,
    outdir 
}) {
    const html = ReactDOMServer.renderToString(
        React.createElement(HtmlDocument, {
            content: React.createElement(template, initialProps),
            title,
            description,
            keywords,
            dirOffset,
            initialProps,
            hydrateScriptSrc
        })
    );

    // Bundle client-side code
    await esbuild.build({
        entryPoints: [hydrateEntryPoint],
        bundle: true,
        outdir,
        format: 'esm',
        splitting: true,
        minify: true,
        loader: {
            '.js': 'jsx',
            '.jsx': 'jsx'
        },
        define: {
            'process.env.NODE_ENV': '"production"'
        }
    });

    return html;
}

async function generate() {
    try {
        // delete everything in ../ except .git and generate
        const entries = await fs.readdir('../', { withFileTypes: true });
        for (const entry of entries) {
            if ((entry.name !== '.git') && (entry.name !== '__generate')) {
                const fullPath = path.join('../', entry.name);
                await fs.rm(fullPath, { recursive: true, force: true });
            }
        }

        // Process Tailwind CSS first
        await processTailwind();

        // copy over images from ./images to ../images
        await fs.cp('./images', '../images', { recursive: true });

        // get all articles filenames
        const articleFiles = await fs.readdir('./articles');

        // parse all articles md file content -> title, date, tags, sections (html content)
        const articles = await parseArticles(articleFiles);
        console.log(articles);

        // create output folder if it doesn't exist
        await fs.mkdir(path.join('../articles'), { recursive: true });

        // generate home page
        const indexPageHTML = await generatePage({
            template: HomeTemplate,
            initialProps: { articles },
            hydrateScriptSrc: '../dist/hydrate.js',
            dirOffset: './',
            title: `${config.title}`,
            description: config.description,
            keywords: config.keywords,
            hydrateEntryPoint: './pages/hydrate.jsx',
            outdir: '../dist'
        });
        
        // write index page to ../index.html
        await fs.writeFile(path.join('../index.html'), indexPageHTML);
        console.log(`Index page generated successfully!`);


        // generate article pages
        for (let article of articles) {
            const similar = articles.filter(a =>
                a.tags.split(',').some(k => article.tags.split(',').some(keyword => keyword === k))
                && a.title !== article.title
            );

            const initialProps = { ...article, similar };

            const articlePageHTML = await generatePage({
                template: ArticleTemplate,
                initialProps,
                hydrateScriptSrc: '../dist/article/hydrate.js',
                dirOffset: '../',
                title: `${config.title} | ${article.title}`,
                description: config.description,
                keywords: config.keywords,
                hydrateEntryPoint: './pages/article/hydrate.jsx',
                outdir: '../dist/article'
            });
    
            await fs.writeFile(path.join('../articles', `${article.slug}.html`), articlePageHTML);
            console.log(`${article.title} generated successfully!`);
        }

        exec('live-server ../');

        if (config.push) gitCommitAndPush();

    } catch (error) {
        console.error('Error:', error);
    }
}

generate(); 