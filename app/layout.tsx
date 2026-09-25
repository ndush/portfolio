import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { profile } from "@/lib/data";
import "./globals.css";

const lora = Lora({ subsets: ["latin"], variable: "--font-lora", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.blurb,
};

// Runs in <head> before React hydrates:
// 1. Drops stray comment/whitespace nodes a host injects into <head> (Netlify adds
//    "\n<!-- This site is hosted on Netlify… -->"). React 18 hits the text node,
//    fails hydration and re-renders the whole page, wiping data-theme.
// 2. Applies a saved theme before first paint. No saved choice → CSS follows the system.
const themeScript = `(function(){var n=document.head.childNodes;for(var i=n.length-1;i>=0;i--){var c=n[i];if(c.nodeType===8||(c.nodeType===3&&!c.textContent.trim()))c.parentNode.removeChild(c)}try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
