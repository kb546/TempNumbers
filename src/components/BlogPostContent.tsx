"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from '@/data/blogPosts';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      delay
    }
  })
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

interface BlogPostContentProps {
  post: BlogPost;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  // Share functionality
  const handleShare = (platform: string) => {
    // Get the current URL
    const url = typeof window !== 'undefined' 
      ? encodeURIComponent(window.location.href)
      : '';
    const title = encodeURIComponent(post.title);
    const via = "temp_numbers"; // Twitter handle without @
    
    // Unified message for all platforms
    const message = `Just discovered this privacy game-changer! ${post.title} by @${via}. Check it out:`;
    const encodedMessage = encodeURIComponent(message);
    
    let shareUrl = '';
    
    switch(platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${encodedMessage}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${encodedMessage}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodedMessage}`;
        break;
    }
    
    if (shareUrl && typeof window !== 'undefined') {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div>
      {/* Hero Banner with Enhanced Design */}
      <section className="relative w-full h-[50vh] min-h-[400px] max-h-[600px] overflow-hidden">
        {post.image && (
          <>
            <Image 
              src={post.image} 
              alt={post.title} 
              fill
              className="object-cover"
              priority
              sizes="100vw"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70"></div>
            
            {/* Content section remains the same... */}
            <div className="container relative h-full px-4 mx-auto max-w-7xl flex flex-col justify-end pb-16">
              <motion.div
                className="max-w-4xl"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <motion.div
                  className="mb-4 flex gap-2 flex-wrap"
                  variants={fadeIn}
                  custom={0.1}
                >
                  {post.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className={`px-3 py-1 text-sm rounded-full font-medium inline-block 
                        ${index === 0 
                          ? 'bg-primary/90 text-white shadow-sm' 
                          : 'bg-white/10 text-white/90 backdrop-blur-sm'}`}
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
                
                <motion.h1 
                  className="text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-sm tracking-tight"
                  variants={fadeIn}
                  custom={0.2}
                >
                  {post.title}
                </motion.h1>
              </motion.div>
            </div>
          </>
        )}
      </section>
      
      {/* Rest of your JSX remains the same... */}
      {/* Just copy over the main content section and sharing buttons */}
    </div>
  );
} 