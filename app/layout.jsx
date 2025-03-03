import { Lexend, JetBrains_Mono } from "next/font/google";
import 'prismjs/themes/prism.css';
import "./globals.css";

import Background from "@/components/background";
import config from "@/config";
import Link from "next/link";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: config.title,
  description: config.description,
};

export default function RootLayout({ children }) {
  const [titlePart, titleSecondaryPart] = config.title.split(/\.|\s|-/g);

  return (
    <html lang="en" className={`${lexend.variable} ${jetBrainsMono.variable}`}>
      <body className="antialiased font-mono text-text flex flex-col items-center w-full min-h-screen py-8">
        <Background />
        <div className="w-full max-w-[1200px] flex flex-col gap-8 items-center px-2 lg:px-8">
          <div className="w-full flex justify-between items-center mb-2">
            <Link href="/">
              <h1 className="text-4xl font-mono uppercase font-black">
                <span className="text-logo mr-3">
                  {titlePart}
                </span>
                <span className="text-logo-secondary underline decoration-wavy decoration-primary underline-offset-[8px]">
                  {titleSecondaryPart}
                </span>
              </h1>
            </Link>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
