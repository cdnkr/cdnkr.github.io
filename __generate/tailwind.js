import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function processTailwind() {
    return new Promise((resolve, reject) => {
        const tailwindBin = join(__dirname, 'node_modules', '.bin', 'tailwindcss');
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