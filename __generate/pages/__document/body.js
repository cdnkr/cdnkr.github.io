const { containerHTML } = require("./container");
const { scriptsHTML } = require("./scripts");

function bodyHTML({
    content,
    scripts
}) {
    const html = `
<body class="bg-background text-text flex flex-col items-center w-full min-h-screen py-8">
    ${containerHTML({
        content
    })}
    ${scriptsHTML({
        scripts
    })}
</body>
</html>`;
    return html;
}

exports.bodyHTML = bodyHTML;