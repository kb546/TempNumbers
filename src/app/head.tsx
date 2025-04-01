'use client';

import React, { useEffect } from 'react';

export default function CustomHead() {
  useEffect(() => {
    // Force favicon refresh by adding a timestamp
    const timestamp = Date.now();
    
    // Remove any existing favicon links
    const existingLinks = document.querySelectorAll('link[rel*="icon"]');
    existingLinks.forEach(link => link.parentNode?.removeChild(link));
    
    // Create new favicon links
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = `/ProfilePicture.png?v=${timestamp}`;
    link.type = 'image/png';
    document.head.appendChild(link);
    
    // Create shortcut icon
    const shortcutLink = document.createElement('link');
    shortcutLink.rel = 'shortcut icon';
    shortcutLink.href = `/ProfilePicture.png?v=${timestamp}`;
    shortcutLink.type = 'image/png';
    document.head.appendChild(shortcutLink);
    
    // Create apple touch icon
    const appleLink = document.createElement('link');
    appleLink.rel = 'apple-touch-icon';
    appleLink.href = `/ProfilePicture.png?v=${timestamp}`;
    document.head.appendChild(appleLink);
    
  }, []);
  
  return null;
} 