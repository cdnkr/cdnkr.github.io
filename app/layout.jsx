import { Lexend, JetBrains_Mono } from "next/font/google";
import 'prismjs/themes/prism.css';
import "./globals.css";

import Background from "@/components/background";
import config from "@/config";

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
  return (
    <html lang="en" className={`${lexend.variable} ${jetBrainsMono.variable}`}>
      <body className="antialiased font-mono text-text flex flex-col items-center w-full min-h-screen py-8">
        <Background />
        <div className="w-full max-w-[1080px] flex flex-col gap-8 items-center px-2 lg:px-8">
          {children}
        </div>
      </body>
    </html>
  );
}
