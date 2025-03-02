const path = require('path');
const { exec } = require('child_process');

async function processTailwind() {
    return new Promise((resolve, reject) => {
        const tailwindBin = path.join(__dirname, 'node_modules', '.bin', 'tailwindcss');
        exec(`"${tailwindBin}" -i ./styles.css -o ../styles.css`, (error, stdout, stderr) => {
            if (error) {
                console.error('Tailwind processing error:', error);
                reject(error);
                return;
            }
            if (stderr) {
                console.error('Tailwind stderr:', stderr);
            }
            console.log('Tailwind processed successfully');
            resolve(stdout);
        });
    });
}

module.exports = {
    processTailwind
};