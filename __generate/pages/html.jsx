import React from 'react';
import config from '../config.js';

function Html({ content, title, description, keywords, dirOffset, initialProps, hydrateScriptSrc }) {
    const [logoPart, logoSecondaryPart] = config.title.split(/\.|\s|-/g);

    return (
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <link rel="icon" href={`https://${config.githubPagesUrl}`} sizes="32x32" />
                <link href={`${dirOffset}styles.css`} rel="stylesheet" />
            </head>
            <body className="bg-background text-text flex flex-col items-center w-full min-h-screen py-8">
                <div className="w-full max-w-[1740px] flex flex-col gap-8 items-center px-2 lg:px-8">
                    <div className="w-full flex justify-start mb-2">
                        <a href={`${dirOffset}index.html`}>
                            <h1 className="text-4xl uppercase font-bold">
                                <span className="text-logo">
                                    {logoPart}
                                </span>
                                <span className="text-primary"> </span>
                                <span className="text-logo-secondary underline decoration-wavy decoration-primary underline-offset-[8px]">
                                    {logoSecondaryPart}
                                </span>
                            </h1>
                        </a>
                    </div>
                    <div id="root" className="w-full">
                        {content}
                    </div>
                </div>
                <script dangerouslySetInnerHTML={{
                    __html: `window.__INITIAL_DATA__ = ${JSON.stringify(initialProps)}`
                }}></script>
                <script type="module" src={hydrateScriptSrc}></script>
            </body>
        </html>
    );
}

export default Html;