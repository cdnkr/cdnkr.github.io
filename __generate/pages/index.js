const fs = require('fs').promises;
const path = require('path');

const { headHTML } = require('./__document/head');
const { bodyHTML } = require('./__document/body');

const config = require('../config.json');

async function generateIndexHTML(articles) {
    const __headHTML = await headHTML({
        title: config.title,
        description: config.description,
        keywords: config.keywords
    });

    const content = `
<div class="w-full flex flex-col lg:flex-row gap-4 lg:gap-8">
    <div id="sectionsContainer" class="w-full flex flex-col gap-2">
        ${articles?.sort((a, b) => new Date(b.date) - new Date(a.date))?.map(({date, title, description, tags, slug}, i) => `
            <a href="./articles/${slug}.html">
                <div id="${encodeURIComponent(title)}" class="w-full section-block mb-6 p-4 bg-card-background rounded-lg">
                    <div class="w-full flex justify-between mb-2">
                        <h2 class="text-2xl lg:px-4 max-w-full text-wrap break-words font-bold">${title}</h2>
                    </div>
                    <div class="w-full flex flex-wrap gap-2 mb-2 px-4">
                        <span class="text-gray-500">${date}</span>${tags.split(",").map(tag => `<span class="text-sm uppercase text-primary">${tag}</span>`)?.join("")}
                    </div>
                    <div class="tab-content lg:p-4 lg:pt-2">
                        ${description}
                    </div>
                </div>
            </a>
        `).join('')}
    </div>
    <div class="w-full lg:w-[300px] lg:min-w-[300px] lg:max-w-[300px] xl:max-w-[500px] xl:w-[500px] xl:min-w-[500px]">
        <div class="w-full sticky top-8">
            <div id="sectionLinks" class="w-full flex flex-col gap-2">
                <div class="w-full hidden lg:flex flex-col gap-4 mb-4 bg-card-background rounded-lg p-4">
                    <!-- <h1 class="text-xl uppercase font-bold text-center lg:text-left">front-end <span class="font-[400] text-gray-400 uppercase text-xl underline decoration-wavy decoration-[#ffffff] underline-offset-4">refresh</span><span class="font-[400] text-gray-600 lowercase"></span></h1> -->
                    <input 
                        type="text" 
                        id="sectionSearch" 
                        placeholder="Search page... (Ctrl + K)" 
                        class="w-full max-w-full px-4 py-3 rounded-lg bg-card-background border-none focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                </div>
                <!--
                <div id="sectionLinksList" class="hidden lg:flex w-full flex-col gap-1 mb-4 max-h-[calc(100vh-20rem)] overflow-y-auto no-scrollbar bg-card-background rounded-lg p-4">
                ${articles?.map(({ title, slug }, i) => `
                    <a 
                        href="./articles/${slug}.html"
                        class="block hover:bg-card-background ${i === 0 ? 'bg-card-background' : ''} transition-colors duration-200 py-1 px-2 rounded-md "
                    >
                        ${decodeURIComponent(title)}
                    </a>
                `).join('')}
                </div>
                -->
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
</div>`

const scripts = `
    document.addEventListener('keydown', (e) => {
        // Only prevent default for arrow keys
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            
            const sections = document.querySelectorAll('.section-block');
            const currentSection = Array.from(sections).find(section => {
                const rect = section.getBoundingClientRect();
                // Add a small buffer to prevent edge cases
                return rect.top >= -10 && rect.top <= window.innerHeight / 3;
            });
            
            if (!currentSection) return;
            
            const currentIndex = Array.from(sections).indexOf(currentSection);
            let targetSection;
            
            if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
                targetSection = sections[currentIndex + 1];
            } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                targetSection = sections[currentIndex - 1];
            }
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    // Search functionality
    const searchInput = document.getElementById('sectionSearch');
    const sectionsContainer = document.getElementById('sectionsContainer');
    const sectionBlocks = document.querySelectorAll('.section-block');
    const sectionLinks = document.querySelectorAll('#sectionLinksList a');

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        // Keep track of matching section names
        const matchingSectionTitles = new Set();
        
        sectionBlocks.forEach(block => {

            console.log(block);
            let sectionTitle = block.querySelector('h2')?.textContent?.toLowerCase();

            if (!sectionTitle) {
                sectionTitle = block.querySelector('h1').textContent.toLowerCase();
            }

            console.log({sectionTitle});
            const content = block?.textContent.toLowerCase() || '';

            console.log({content});

            const isMatch = content.includes(searchTerm);

            if (isMatch) {
                block.style.display = 'block';
                matchingSectionTitles.add(sectionTitle);
            } else {
                block.style.display = 'none';
            }
        });

        // Update sidebar links visibility
        sectionLinks.forEach(link => {
            const linkText = link.textContent.trim().toLowerCase();
            if (matchingSectionTitles.has(linkText)) {
                link.style.display = 'block';
            } else {
                link.style.display = 'none';
            }
        });
    });

    // Add keyboard shortcut to focus search
    document.addEventListener('keydown', (e) => {
        // Command/Ctrl + K to focus search
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
        
        // Escape to clear search and blur input
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchInput.blur();
            sectionBlocks.forEach(block => {
                block.style.display = 'block';
            });
        }

        // Only handle arrow keys when search is not focused
        if (document.activeElement !== searchInput) {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {}
        }
    });

    // Template navigation functionality
    document.addEventListener('DOMContentLoaded', () => {
        const sectionLinks = document.querySelectorAll('#sectionLinksList a');
        const blocks = document.querySelectorAll('.section-block');
        
        // Update active link on scroll
        window.addEventListener('scroll', () => {
            let mostVisibleSection = null;
            let maxVisibleHeight = 0;
            
            blocks.forEach(block => {
                const rect = block.getBoundingClientRect();
                
                // Calculate how much of the section is visible in the viewport
                const visibleTop = Math.max(0, Math.min(window.innerHeight, rect.bottom));
                const visibleBottom = Math.max(0, Math.min(window.innerHeight, rect.top));
                const visibleHeight = visibleTop - visibleBottom;
                
                // If this section has more visible area, or it's equally visible but closer to top
                if (visibleHeight > maxVisibleHeight || 
                    (visibleHeight === maxVisibleHeight && rect.top > 0)) {
                    maxVisibleHeight = visibleHeight;
                    mostVisibleSection = block;
                }
            });
            
            if (mostVisibleSection) {
                const id = mostVisibleSection.querySelector('h2').textContent.trim();
                sectionLinks.forEach(link => {
                    if (link.textContent.trim() === id) {
                        link.classList.add('font-semibold', 'bg-card-background');
                    } else {
                        link.classList.remove('font-semibold', 'bg-card-background');
                    }
                });
            }
        });
        
        // Smooth scroll to section when clicking link
        sectionLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetBlock = Array.from(blocks).find(block => 
                    block?.querySelector('h2')?.textContent?.trim() === link.textContent.trim()
                );
                
                if (targetBlock) {
                    targetBlock.scrollIntoView({ behavior: 'smooth' });
                } else {
                    // scroll to the top of the page
                    window.scrollTo({ top: 0, behavior: 'smooth' });

                    // set first section as active
                    const firstSection = document.querySelector('.section-block');
                    firstSection.classList.add('font-semibold', 'bg-card-background');
                }
            });
        });
    });`

    const pageHTML = `
    ${__headHTML}
    ${bodyHTML({
        content,
        scripts
    })}`;

    await fs.writeFile(path.join('../', `index.html`), pageHTML);
}

exports.generateIndexHTML = generateIndexHTML;