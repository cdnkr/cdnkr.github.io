const fs = require('fs').promises;
const path = require('path');
const marked = require('marked');

const { exec } = require('child_process');

const { generateArticlePageHTML } = require('./pages/article/page.js');
const { generateIndexHTML } = require('./pages/index.js');
const { processTailwind } = require('./tailwind.js');

const config = require('./config.json');

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

            // convert markdown to html
            const contentHTML = marked.parse(content);

            sectionsHTML.push(contentHTML);
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
        const articleFiles = await fs.readdir('./articles')

        // parse all articles md file content -> title, date, tags, sections (html content)
        const articles = await parseArticles(articleFiles);
        console.log(articles);

        // generate article pages
        articles.forEach(article => {
            generateArticlePageHTML({
                ...article,
                similar: articles.filter(a =>
                    a.tags.split(',').some(k => article.tags.split(',').some(keyword => keyword === k))
                    && a.title !== article.title
                )
            });
            console.log(`${article.title} generated successfully!`);
        });

        // generate index page
        generateIndexHTML(articles);
        console.log(`Index page generated successfully!`);

        exec('live-server ../');

        if (!config.push) return;

        // run git add and git commit
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

    } catch (error) {
        console.error('Error:', error);
    }
}

generate(); 