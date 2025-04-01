import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomHead from "./head";

// Add a version parameter to force favicon cache refresh
const faviconVersion = Date.now();

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TempNumbers - Secure Temporary Phone Numbers",
  description: "Protecting your privacy with temporary phone numbers for all your verification needs. No personal information required.",
  icons: {
    icon: `/ProfilePicture.png?v=${faviconVersion}`,
    shortcut: `/ProfilePicture.png?v=${faviconVersion}`,
    apple: `/ProfilePicture.png?v=${faviconVersion}`,
  },
  openGraph: {
    title: 'TempNumbers - Secure Temporary Phone Numbers',
    description: 'Protecting your privacy with temporary phone numbers for all your verification needs.',
    images: ['/ProfilePicture.png'],
  },
  twitter: {
    card: 'summary',
    title: 'TempNumbers - Secure Temporary Phone Numbers',
    description: 'Protecting your privacy with temporary phone numbers for all your verification needs.',
    images: ['/ProfilePicture.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <CustomHead />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
