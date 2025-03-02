const { containerHTML } = require("./container");
const { scriptsHTML } = require("./scripts");

function bodyHTML({
    content,
    scripts,
    dirOffset = '.'
}) {
    const html = `
<body class="bg-background text-text flex flex-col items-center w-full min-h-screen py-8">
    ${containerHTML({
        content,
        dirOffset
    })}
    ${scriptsHTML({
        scripts,
    })}
</body>
</html>`;
    return html;
}

exports.bodyHTML = bodyHTML;