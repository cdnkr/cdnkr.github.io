import React from 'react';
// import { MDXProvider } from '@mdx-js/react';
import { evaluate } from '@mdx-js/mdx';

// Custom components for MDX
// const components = {
//     h1: props => <h1 className="text-4xl font-bold" {...props} />,
//     h2: props => <h2 className="text-3xl font-bold" {...props} />,
// };

function ArticleTemplate({ title, sections, sectionTitles, similar }) {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [evaluatedSections, setEvaluatedSections] = React.useState([]);

    React.useEffect(() => {
        Promise.all(sections.map(section => 
            evaluate(section)
        )).then(evaluated => {
            setEvaluatedSections(evaluated.map(e => e.default));
        });
    }, [sections]);

    return (
        // <MDXProvider components={components}>
            <div className="w-full grid grid-cols-12 gap-4 lg:gap-8">
                <div className="w-full col-span-12 lg:col-span-4 xl:col-span-3">
                    <div className="w-full lg:sticky top-8">
                        <div id="sectionLinks" className="w-full flex flex-col gap-2">
                            <div className="w-full lg:flex flex-col gap-4 mb-4 bg-card-background rounded-lg p-4">
                                <input
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    type="text"
                                    id="sectionSearch"
                                    placeholder="Search page... (Ctrl + K)"
                                    className="w-full max-w-full px-4 py-3 rounded-lg bg-card-background border-none focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div id="sectionLinksList" className="hidden lg:flex w-full flex-col gap-1 mb-4 max-h-[calc(100vh-20rem)] overflow-y-auto no-scrollbar bg-card-background rounded-lg p-4">
                                {sectionTitles.map((title, i) => (
                                    <a
                                        href={`#${title}`}
                                        className={`truncate block hover:bg-card-background ${i === 0 ? 'bg-card-background' : ''} transition-colors duration-200 py-1 px-2 rounded-md `}
                                    >
                                        {decodeURIComponent(title)}
                                    </a>
                                ))}
                            </div>
                            <div className="w-full hidden lg:flex flex-col gap-4 mb-4 bg-card-background rounded-lg p-4">
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full relative cursor-pointer rounded-lg border-none p-0 outline-offset-4 bg-primary block"
                                >
                                    <span className="flex translate-y-[-6px] transform items-center justify-center gap-1 rounded-lg px-10 py-3 font-semibold active:translate-y-[-2px] min-w-[150px] border-2 border-primary bg-border-button-background text-primary">
                                        Share
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                        </svg>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div className="w-full hidden lg:block xl:hidden top-8">
                            <div id="sectionLinks" className="w-full flex flex-col gap-2">
                                {similar?.sort((a, b) => new Date(b.date) - new Date(a.date))?.map(({ date, title, tags, slug }, i) => (
                                    <a href={`./${slug}.html`}>
                                        <div id={encodeURIComponent(title)} className="w-full section-block mb-6 p-4 bg-card-background rounded-lg">
                                            <div className="w-full flex flex-col mb-2">
                                                <h3 className="text-xl max-w-full text-wrap break-words font-bold">{title}</h3>
                                            </div>
                                            <div className="w-full flex flex-wrap gap-2 mb-2">
                                                <span className="text-gray-500 leading-none">
                                                    {date}
                                                </span>
                                                {tags.split(",").map(tag => <span className="text-sm uppercase text-primary">{tag}</span>)}
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div id="sectionsContainer" className="w-full col-span-12 lg:col-span-8 xl:col-span-6 flex flex-col gap-2">
                    {sections.filter(section => section.toLowerCase().includes(searchTerm.toLowerCase())).map((section, i) => (
                        <div id={`${sectionTitles[i]}`} className="w-full section-block mb-6 p-4 bg-card-background rounded-lg">
                            <h2 className="text-2xl lg:px-4  mb-2 max-w-full text-wrap break-words font-bold">{decodeURIComponent(sectionTitles[i])}</h2>
                            <div className="tab-content prose lg:p-4" dangerouslySetInnerHTML={{ __html: section }} />
                        </div>
                    ))}
                    {/* {sections
                        .map((section, i) => (
                        <div id={`${sectionTitles[i]}`} className="w-full section-block mb-6 p-4 bg-card-background rounded-lg">
                            <h2 className="text-2xl lg:px-4 mb-2 max-w-full text-wrap break-words font-bold">
                                {decodeURIComponent(sectionTitles[i])}
                            </h2>
                            <div className="tab-content prose lg:p-4">
                                {evaluatedSections[i] && React.createElement(evaluatedSections[i])}
                            </div>
                        </div>
                    ))} */}
                    {/* <div className="w-full section-block mb-6 p-4 bg-card-background rounded-lg">
                        <h2 className="text-2xl lg:px-4 mb-2 max-w-full text-wrap break-words font-bold">
                            {decodeURIComponent(title)}
                        </h2>
                        <div className="tab-content prose lg:p-4">
                            {React.createElement(evaluate(content, {
                                ...React,
                                components
                            }))}
                        </div>
                    </div> */}
                </div>
                <div className="w-full hidden xl:block xl:col-span-3">
                    <div className="w-full sticky top-8">
                        <div id="sectionLinks" className="w-full flex flex-col gap-2">
                            {similar?.sort((a, b) => new Date(b.date) - new Date(a.date))?.map(({ date, title, tags, slug }, i) => (
                                <a href={`./${slug}.html`}>
                                    <div id={`${encodeURIComponent(title)}`} className="w-full section-block mb-6 p-4 bg-card-background rounded-lg">
                                        <div className="w-full flex flex-col mb-2">
                                            <h3 className="text-xl max-w-full text-wrap break-words font-bold">{title}</h3>
                                        </div>
                                        <div className="w-full flex flex-wrap gap-2 mb-2">
                                            <span className="text-gray-500 leading-none">{date}</span>{tags.split(",").map(tag => <span className="text-sm uppercase text-primary">{tag}</span>)}
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        // </MDXProvider>
    );
}

export default ArticleTemplate;