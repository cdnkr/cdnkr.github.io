'use client';

// adapted from https://codepen.io/Dillo/pen/NPWbdMP (thank you ✌️)

import { useEffect, useRef } from 'react';

export default function Background() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const LWIDTH = 2;
        const FRQ = 3;
        let ctx;
        let maxx, maxy;

        const mrandom = Math.random;
        const mfloor = Math.floor;
        const mceil = Math.ceil;

        function alea(mini, maxi) {
            if (typeof maxi == "undefined") return mini * mrandom();
            return mini + mrandom() * (maxi - mini);
        }

        function intAlea(mini, maxi) {
            if (typeof maxi == "undefined") return mfloor(mini * mrandom());
            return mini + mfloor(mrandom() * (maxi - mini));
        }

        function Noise1DOneShot(period, min = 0, max = 1, random) {
            random = random || Math.random;
            let currx = random();
            let y0 = min + (max - min) * random();
            let y1 = min + (max - min) * random();
            let dx = 1 / period;
            const dx0 = 0.667 * dx;
            const dx1 = 1.333 * dx;
            dx = dx0 + (dx1 - dx0) * random();

            return function () {
                currx += dx;
                if (currx > 1) {
                    currx -= 1;
                    y0 = y1;
                    y1 = min + (max - min) * random();
                    dx = dx0 + (dx1 - dx0) * random();
                }
                let z = (3 - 2 * currx) * currx * currx;
                return z * y1 + (1 - z) * y0;
            };
        }

        function Noise1DOneShotHarm(period, min = 0, max = 1, ampl, random) {
            random = random || Math.random;
            let ampx = 1 / (1 + ampl);
            let rnd1 = Noise1DOneShot(period, ampx * min, ampx * max, random);
            ampx = ampl / (1 + ampl);
            let rnd2 = Noise1DOneShot(period / 2, ampx * min, ampx * max, random);

            return function () {
                return rnd1() + rnd2();
            };
        }

        function startOver() {
            const canvas = canvasRef.current;
            if (!canvas) return;

            maxx = window.innerWidth;
            maxy = window.innerHeight;

            canvas.width = maxx;
            canvas.height = maxy;

            ctx.lineJoin = "round";
            ctx.lineCap = "round";

            // colorful
            let rndColor = () => `hsl(${intAlea(240)} ${intAlea(60, 100)}% ${intAlea(30, 70)}%)`;

            // shades of blue
            // let rndColor = () => `hsl(${intAlea(200, 240)} ${intAlea(60, 100)}% ${intAlea(30, 70)}%)`;

            // shades of red
            // let rndColor = () => `hsl(${intAlea(340, 360)} ${intAlea(60, 100)}% ${intAlea(30, 70)}%)`;

            // greyscale
            // let rndColor = () => `hsl(0 0% ${intAlea(0, 100)}%)`;

            let width = maxx / alea(12, 25);
            let nbcol = mceil(maxx / width) + 6;
            let offsx = (maxx - nbcol * width) / 2;

            const groups = new Array(3).fill(3).map((v, kg) => ({ kg, sections: [] }));

            let frqy = maxy / FRQ / LWIDTH / 3;

            for (let col = 0; col < nbcol; ++col) {
                const grp = col % 3;
                const x0 = offsx + col * width;
                const x1 = offsx + (col + 3) * width;
                groups[grp].sections.push({
                    f0: Noise1DOneShotHarm(frqy, x0, x1, 0.25),
                    color: rndColor()
                });
            }

            ctx.lineWidth = LWIDTH;
            for (let ky = 0; LWIDTH * ky < maxy; ++ky) {
                const y = ky * LWIDTH;
                const grp = ky % 3;
                let xpre = -10;
                groups[grp].sections.forEach((sect) => {
                    ctx.strokeStyle = sect.color;
                    ctx.beginPath();
                    ctx.moveTo(xpre, y);
                    xpre = sect.f0();
                    ctx.lineTo(xpre, y);
                    ctx.stroke();
                });
            }
        }

        // Initialize
        if (canvasRef.current) {
            ctx = canvasRef.current.getContext('2d');
            startOver();

            // Add event listener for window resize
            window.addEventListener('resize', startOver);
            canvasRef.current.addEventListener('click', startOver);

            // Cleanup
            return () => {
                window.removeEventListener('resize', startOver);
                if (canvasRef.current) {
                    canvasRef.current.removeEventListener('click', startOver);
                }
            };
        }
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                opacity: 0.5,
                pointerEvents: 'none', // Add this if you want clicks to pass through
                backgroundColor: 'transparent'
            }}
        />
    );
}