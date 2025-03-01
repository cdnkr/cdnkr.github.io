date: 2024-11-11
description: How to set up a Progressive Web App (PWA) in a Next.js project
tags: How-to,PWA,Next.js
slug: setting-up-a-pwa-in-nextjs

---

## Setting up a PWA in Next.js

The following details how to set up a PWA in a Next.js 15 App Router project. As well as adding an install button.

---

## Step 1: Create the `manifest.json` File

The `manifest.json` file provides metadata for your PWA, like its name, icons, and theme color.

1. In the root of your `public/` folder, create a `manifest.json` file:

   ```json
   // public/manifest.json
   {
     "name": "Your App Name",
     "short_name": "App",
     "description": "Your app description",
     "start_url": "/",
     "display": "standalone",
     "background_color": "#ffffff",
     "theme_color": "#ffffff",
     "icons": [
       {
         "src": "/icons/icon-48x48.png",
         "sizes": "48x48",
         "type": "image/png"
       },
       {
         "src": "/icons/icon-72x72.png",
         "sizes": "72x72",
         "type": "image/png"
       },
       {
         "src": "/icons/icon-96x96.png",
         "sizes": "96x96",
         "type": "image/png"
       },
       {
         "src": "/icons/icon-144x144.png",
         "sizes": "144x144",
         "type": "image/png"
       },
       {
         "src": "/icons/icon-192x192.png",
         "sizes": "192x192",
         "type": "image/png"
       },
       {
         "src": "/icons/icon-256x256.png",
         "sizes": "256x256",
         "type": "image/png"
       },
       {
         "src": "/icons/icon-512x512.png",
         "sizes": "512x512",
         "type": "image/png"
       }
     ]
   }
   ```

2. **Add Icons**: Place the required icon files (e.g., `icon-192x192.png`, `icon-512x512.png`, etc.) in the `public/icons` directory.

---

## Step 2: Update the `layout.tsx` to Include Manifest and Meta Tags

In a Next.js App Router project, use `layout.tsx` in the `app` directory to add the necessary tags.

1. Open your `app/layout.tsx` file and add the manifest link, theme color, and icon link in the `<head>` section.

   ```jsx
   // app/layout.tsx
   import './globals.css';
   import { Metadata } from 'next';

   export const metadata: Metadata = {
     title: 'Your App Name',
     description: 'Your app description',
     themeColor: '#ffffff',
   };

   export default function RootLayout({
     children,
   }: {
     children: React.ReactNode;
   }) {
     return (
       <html lang="en">
         <head>
           <link rel="manifest" href="/manifest.json" />
           <link rel="icon" href="/icons/icon-192x192.png" />
           <meta name="theme-color" content="#ffffff" />
         </head>
         <body>{children}</body>
       </html>
     );
   }
   ```

---

## Step 3: Add an Install Button for the PWA

This will allow users to manually trigger the PWA install prompt when they click a button.

1. Create an `InstallButton` component that listens for the `beforeinstallprompt` event, which is triggered when the app meets the PWA installability criteria.

   ```jsx
   // components/InstallButton.tsx
   import { useEffect, useState } from 'react';

   const InstallButton = () => {
     const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
     const [isInstallable, setIsInstallable] = useState(false);

     useEffect(() => {
       const handleBeforeInstallPrompt = (e: Event) => {
         e.preventDefault();
         setDeferredPrompt(e);
         setIsInstallable(true);
       };

       window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

       return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
     }, []);

     const handleInstallClick = async () => {
       if (deferredPrompt) {
         (deferredPrompt as any).prompt();
         const { outcome } = await (deferredPrompt as any).userChoice;
         setDeferredPrompt(null);
         setIsInstallable(false);
         console.log(`User response to the install prompt: ${outcome}`);
       }
     };

     return (
       <>
         {isInstallable && (
           <button onClick={handleInstallClick} className="install-button">
             Install App
           </button>
         )}
       </>
     );
   };

   export default InstallButton;
   ```

2. Add `InstallButton` to your layout or any component where you’d like the install button to appear.

   ```jsx
   // app/layout.tsx or another component
   import InstallButton from '@/components/InstallButton';

   export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
       <html lang="en">
         <head>
           <link rel="manifest" href="/manifest.json" />
           <meta name="theme-color" content="#ffffff" />
         </head>
         <body>
           <InstallButton />
           {children}
         </body>
       </html>
     );
   }
   ```

---

## Step 4: Set Up the Service Worker (Optional)

To further optimize your PWA for offline capabilities, you can set up a service worker using `next-pwa` or another library. Here’s an example using `next-pwa`:

1. Install `next-pwa`:

   ```bash
   npm install next-pwa
   ```

2. Configure `next-pwa` in your `next.config.js` file:

   ```javascript
   // next.config.js
   const withPWA = require('next-pwa')({
     dest: 'public',
   });

   module.exports = withPWA({
     // other Next.js configurations
   });
   ```

3. After setting up `next-pwa`, a `sw.js` file will be generated automatically in the `public/` directory during the build process. This file enables caching for offline use.

---

## Step 5: Add Generated Service Worker Files to `.gitignore`

Since service workers like `sw.js` and `workbox-xxxxxx.js` are generated during the build process, add them to `.gitignore`:

```plaintext
# .gitignore
/public/sw.js
/public/workbox-*.js
```

---

## Step 6: Test the PWA Setup

1. Build and serve the app in production mode:

   ```bash
   npm run build && npm start
   ```

2. Open your app in Chrome or another browser that supports PWAs, and check for the "Install" option in the browser’s address bar or try the custom install button.

3. Test the offline functionality by going offline after the initial load to see if the app is available.