"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-primary shadow-md">
              <Image 
                src="/ProfilePicture.png" 
                alt="TempNumbers Logo" 
                width={40}
                height={40}
                className="w-full h-full object-contain" 
                priority
              />
            </div>
            <span className="font-bold text-xl">TempNumbers</span>
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link href="/blog" className="hover:text-primary font-medium">Blog</Link>
            <Link href="/about" className="hover:text-primary font-medium">About</Link>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header; 