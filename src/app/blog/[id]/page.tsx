"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, Clock, Facebook, Linkedin, Twitter } from "lucide-react";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BlogPost, blogPosts, processContent } from "@/data/blogPosts";

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

// Define metadata
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = params.id;
  const post = blogPosts[id] || blogPosts["default"];

  return {
    title: `${post.title} | TempNumbers Blog`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | TempNumbers Blog`,
      description: post.excerpt,
      images: [{
        url: post.image,
      }],
    },
  };
}

export default function BlogPost({ params }: { params: { id: string } }) {
  const id = params.id;
  const post = blogPosts[id];

  if (!post) {
    notFound();
  }

  // Process content with Quackr links and intro
  const processedContent = processContent(post.content);

  // Generate share message (unified for all platforms)
  const shareMessage = `${post.title} - Check out this article from @TempNumbers!`;
  
  // Handle share functions
  const handleShare = (platform: "facebook" | "twitter" | "linkedin") => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    
    // Create share URLs for different platforms
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(shareMessage)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareMessage)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}&summary=${encodeURIComponent(shareMessage)}`
    };
    
    // Open share dialog
    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div className="container max-w-4xl py-8 px-4 md:px-6">
      {/* Back to blogs link */}
      <Link
        href="/blog"
        className="inline-flex items-center mb-8 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all articles
      </Link>

      {/* Featured image */}
      <div className="aspect-video relative rounded-lg overflow-hidden mb-8 shadow-md">
        <img
          src={post.image}
          alt={post.title}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Article header */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
          {post.title}
        </h1>
        <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>
        
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarFallback className="bg-primary/10 text-primary">
              TN
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium">{post.author}</p>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-3 w-3" />
              <time dateTime={post.date}>{post.date}</time>
              <span className="mx-2">•</span>
              <Clock className="mr-1 h-3 w-3" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
        <Separator className="mt-6" />
      </div>

      {/* Article content */}
      <div 
        className="prose dark:prose-invert max-w-none mb-12" 
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />

      {/* Share section */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold mb-3">Share this article</h3>
        <div className="grid grid-cols-3 gap-3 w-full max-w-md">
          {/* Facebook */}
          <Button
            onClick={() => handleShare("facebook")}
            variant="outline"
            className="h-12 w-full px-0 flex items-center justify-center hover:bg-[#1877F2]/10 hover:border-[#1877F2]/50 transition-colors"
            aria-label="Share on Facebook"
          >
            <Facebook className="h-5 w-5 text-[#1877F2]" />
          </Button>
          
          {/* Twitter/X */}
          <Button
            onClick={() => handleShare("twitter")}
            variant="outline"
            className="h-12 w-full px-0 flex items-center justify-center hover:bg-black/10 hover:border-black/50 transition-colors"
            aria-label="Share on X (Twitter)"
          >
            <Twitter className="h-5 w-5" />
          </Button>
          
          {/* LinkedIn */}
          <Button
            onClick={() => handleShare("linkedin")}
            variant="outline"
            className="h-12 w-full px-0 flex items-center justify-center hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/50 transition-colors"
            aria-label="Share on LinkedIn"
          >
            <Linkedin className="h-5 w-5 text-[#0A66C2]" />
          </Button>
        </div>
      </div>

      {/* Related posts would go here */}
      
      {/* Back to blogs button */}
      <div className="text-center">
        <Link 
          href="/blog" 
          className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
        >
          Browse more articles
        </Link>
      </div>
    </div>
  );
} 