function scriptsHTML({
    scripts,
}) {
    const html = `
<script>
    ${scripts}
</script>`;

return html;
}

exports.scriptsHTML = scriptsHTML;