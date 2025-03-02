const config = require('../../config.json');

function containerHTML({
    content,
}) {
    const [logoPart, logoSecondaryPart] = config.title.split(/\.|\s|-/g);

    const html = `
<div class="w-full max-w-[1740px] flex flex-col gap-8 items-center px-2 lg:px-8">
    <div class="w-full flex justify-start mb-2">
        <a href="../index.html">
            <h1 class="text-4xl uppercase font-bold">
                <span class="text-logo">
                    ${logoPart}</span>
                <span class="text-primary"> </span>
                <span class="text-logo-secondary underline decoration-wavy decoration-primary underline-offset-[8px]">
                    ${logoSecondaryPart}
                </span>
            </h1>
        </a>
    </div>
    ${content}
</div>`;

return html;
}

exports.containerHTML = containerHTML;