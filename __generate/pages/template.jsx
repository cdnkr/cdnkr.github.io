import React from 'react';

function HomeTemplate({ articles }) {
    const [searchTerm, setSearchTerm] = React.useState('');

    return (
        <div class="w-full flex flex-col lg:flex-row gap-4 lg:gap-8">
            <div id="sectionsContainer" class="w-full flex flex-col gap-2">
                {articles?.filter(article => article.title.toLowerCase().includes(searchTerm.toLowerCase())).sort((a, b) => new Date(b.date) - new Date(a.date))?.map(({ date, title, description, tags, slug }, i) => (
                    <a href={`./articles/${slug}.html`}>
                        <div id={encodeURIComponent(title)} class="w-full section-block mb-6 p-4 bg-card-background rounded-lg">
                            <div class="w-full flex justify-between mb-2">
                                <h2 class="text-2xl lg:px-4 max-w-full text-wrap break-words font-bold">{title}</h2>
                            </div>
                            <div class="w-full flex flex-wrap gap-2 mb-2 px-4">
                                <span class="text-gray-500">{date}</span>{tags.split(",").map(tag => <span class="text-sm uppercase text-primary">{tag}</span>)}
                            </div>
                            <div class="tab-content lg:p-4 lg:pt-2">
                                {description}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
            <div class="w-full lg:w-[300px] lg:min-w-[300px] lg:max-w-[300px] xl:max-w-[500px] xl:w-[500px] xl:min-w-[500px]">
                <div class="w-full sticky top-8">
                    <div id="sectionLinks" class="w-full flex flex-col gap-2">
                        <div class="w-full hidden lg:flex flex-col gap-4 mb-4 bg-card-background rounded-lg p-4">
                            <input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                type="text"
                                id="sectionSearch"
                                placeholder="Search page... (Ctrl + K)"
                                class="w-full max-w-full px-4 py-3 rounded-lg bg-card-background border-none focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <div class="w-full flex flex-col gap-6 mb-4 bg-card-background rounded-lg p-4">
                            <a
                                href="https://github.com/cdnkr"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="w-full relative cursor-pointer rounded-lg border-none p-0 outline-offset-4 bg-primary block"
                            >
                                <span class="flex translate-y-[-6px] transform items-center justify-center gap-1 rounded-lg px-10 py-3 font-semibold active:translate-y-[-2px] min-w-[150px] border-2 border-primary bg-border-button-background text-primary">
                                    github.com/cdnkr
                                </span>
                            </a>

                            <a
                                href="https://www.linkedin.com/in/cdnkr"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="w-full relative cursor-pointer rounded-lg border-none p-0 outline-offset-4 bg-primary block"
                            >
                                <span class="flex translate-y-[-6px] transform items-center justify-center gap-1 rounded-lg px-10 py-3 font-semibold active:translate-y-[-2px] min-w-[150px] border-2 border-primary bg-border-button-background text-primary">
                                    linkedin.com/cdnkr
                                </span>
                            </a>

                            <a
                                href="https://x.com/chaddanker"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="w-full relative cursor-pointer rounded-lg border-none p-0 outline-offset-4 bg-primary block"
                            >
                                <span class="flex translate-y-[-6px] transform items-center justify-center gap-1 rounded-lg px-10 py-3 font-semibold active:translate-y-[-2px] min-w-[150px] border-2 border-primary bg-border-button-background text-primary">
                                    x.com/chaddanker
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeTemplate;