import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TempNumbers - Secure Temporary Phone Numbers",
  description: "Protecting your privacy with temporary phone numbers for all your verification needs. No personal information required.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/ProfilePicture.png', sizes: '32x32', type: 'image/png' },
      { url: '/ProfilePicture.png', sizes: '16x16', type: 'image/png' },
      { url: '/ProfilePicture.png', sizes: '48x48', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/ProfilePicture.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { rel: 'mask-icon', url: '/ProfilePicture.png' }
    ]
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
