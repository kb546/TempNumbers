"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import React from "react";
import { blogPosts } from "@/data/blogPosts";

// Enhanced animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

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

export default function Blog() {
  // Add state for selected tag filter
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Reference for the filtered posts container
  const postsContainerRef = React.useRef<HTMLDivElement>(null);
  
  // Effect to scroll to posts when tag changes
  useEffect(() => {
    if (selectedTag && postsContainerRef.current) {
      // Add a slight delay to ensure animations have started
      const timer = setTimeout(() => {
        postsContainerRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest' 
        });
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [selectedTag]);
  
  // Convert the blog posts object to an array and add numerical ids
  const posts = Object.entries(blogPosts)
    .filter(([id]) => id !== "default") // Exclude the default post
    .map(([id, post]) => ({
      id: parseInt(id),
      title: post.title,
      excerpt: post.excerpt,
      image: post.image,
      tags: post.tags,
      date: post.date,
      readTime: post.readTime
    }));

  // Extract all unique tags from posts
  const allTags = Array.from(
    new Set(
      posts.flatMap(post => post.tags)
    )
  ).sort();
  
  // Filter posts based on selected tag - ensuring strict filtering
  const filteredPosts = selectedTag 
    ? posts.filter(post => post.tags.includes(selectedTag))
    : posts;
    
  // Count posts for each tag
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = posts.filter(post => post.tags.includes(tag)).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div>
      {/* Hero Section with Creative Background */}
      <section className="relative w-full py-24 overflow-hidden bg-gradient-to-b from-background via-background/95 to-secondary/30">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
        </div>
        
        <div className="container relative px-4 mx-auto max-w-7xl">
          <motion.div 
            className="flex flex-col items-center text-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div 
              className="relative w-28 h-28 mb-6 overflow-hidden rounded-full border-4 border-primary/40 shadow-lg shadow-primary/10"
              variants={fadeIn}
              custom={0.1}
            >
              <Image 
                src="/ProfilePicture.png" 
                alt="TempNumbers Logo" 
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay"></div>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary/80"
              variants={fadeIn}
              custom={0.2}
            >
              Privacy & Security Blog
            </motion.h1>
            
            <motion.div 
              variants={fadeIn}
              custom={0.25}
              className="h-1 w-20 bg-primary/70 mx-auto mb-6 rounded-full"
            />
            
            <motion.p 
              className="text-xl max-w-2xl text-muted-foreground leading-relaxed"
              variants={fadeIn}
              custom={0.3}
            >
              Helpful guides, clear breakdowns, and practical tips to protect your privacy and keep your personal information safe in today's connected world.
            </motion.p>
            
            <motion.div
              className="flex flex-wrap gap-3 mt-8 justify-center"
              variants={fadeIn}
              custom={0.4}
            >
              <button 
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-1 text-sm font-medium rounded-full border transition-colors cursor-pointer ${
                  selectedTag === null 
                    ? "bg-primary/10 text-primary border-primary/20" 
                    : "bg-card border-muted hover:border-primary/20"
                }`}
              >
                All Articles ({posts.length})
              </button>
              
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-1 text-sm font-medium rounded-full border transition-colors cursor-pointer ${
                    selectedTag === tag 
                      ? "bg-primary/10 text-primary border-primary/20" 
                      : "bg-card border-muted hover:border-primary/20"
                  }`}
                >
                  {tag} ({tagCounts[tag]})
                </button>
              ))}
            </motion.div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-8 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-background z-10"></div>
        <div className="absolute top-1/2 left-8 w-24 h-24 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      </section>
      
      {/* Blog Posts Grid */}
      <div className="container py-16 px-4 mx-auto max-w-7xl relative" ref={postsContainerRef}>
        {/* Decorative background elements */}
        <div className="absolute -top-10 right-10 w-40 h-40 bg-secondary/40 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-40 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
        
        {/* Active filter indicator */}
        {selectedTag && (
          <motion.div 
            className="flex justify-between items-center mb-8 p-4 bg-primary/5 border border-primary/20 rounded-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex items-center">
              <span className="text-foreground">Showing articles tagged: </span>
              <span className="ml-2 px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                {selectedTag}
              </span>
            </div>
            <button 
              onClick={() => setSelectedTag(null)}
              className="flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <span>Clear filter</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          variants={container}
          initial="hidden"
          animate="show"
          key={selectedTag || 'all'}
        >
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                className="rounded-xl border border-primary/10 bg-card text-card-foreground shadow-md hover:shadow-xl transition-all hover:border-primary/40 group flex flex-col h-full hover:translate-y-[-6px]"
                variants={item}
              >
                {post.image && (
                  <div className="relative h-56 bg-muted overflow-hidden rounded-t-xl">
                    <Image 
                      src={post.image} 
                      alt={post.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/70" />
                    <div className="absolute bottom-4 left-4 z-10">
                      <button
                        onClick={() => setSelectedTag(post.tags[0])}
                        className="px-3 py-1 bg-primary/80 text-white text-xs rounded-full font-medium shadow-sm hover:bg-primary/90 transition-colors"
                        title={`Show all ${tagCounts[post.tags[0]]} articles tagged with "${post.tags[0]}"`}
                      >
                        {post.tags[0]}
                      </button>
                    </div>
                  </div>
                )}
                <div className="p-6 md:p-7 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-3">
                    <time className="text-sm text-muted-foreground block" dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                    </time>
                    <span className="text-xs text-muted-foreground bg-secondary/30 px-2 py-1 rounded-md">
                      {post.readTime}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-muted-foreground mb-5 line-clamp-3 flex-grow leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex gap-2 flex-wrap mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className="inline-flex items-center rounded-full bg-primary/5 px-2.5 py-0.5 text-xs font-medium text-primary/90 hover:bg-primary/10 transition-colors"
                        title={`Show all ${tagCounts[tag]} articles tagged with "${tag}"`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-primary hover:text-primary/80 font-medium inline-flex items-center mt-auto group/link relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      Read article
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover/link:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/50 transform scale-x-0 group-hover/link:scale-x-100 transition-transform origin-left"></span>
                  </Link>
                </div>
              </motion.article>
            ))
          ) : (
            <motion.div 
              className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-16"
              variants={item}
            >
              <div className="inline-flex justify-center items-center w-16 h-16 bg-primary/5 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary/70">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-6">We couldn't find any articles with the tag "{selectedTag}"</p>
              
              {/* Suggest other tags */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-3">Try these tags instead:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {allTags.filter(tag => tag !== selectedTag).slice(0, 5).map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-card hover:bg-primary/5 border border-muted hover:border-primary/20 transition-colors"
                    >
                      {tag} ({tagCounts[tag]})
                    </button>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={() => setSelectedTag(null)}
                className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
              >
                View all articles
              </button>
            </motion.div>
          )}
        </motion.div>
        
        {/* Newsletter Section */}
        <div className="newsletter-cta mt-16 mb-8">
          <motion.div
            className="rounded-3xl border border-primary/20 bg-gradient-to-br from-card via-card/80 to-secondary/30 p-10 shadow-xl overflow-hidden relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Become a Privacy Insider</h2>
              <div className="h-1 w-20 bg-primary/70 mx-auto mb-6 rounded-full"></div>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Join over 20,000 people who care about privacy. Get our newsletter with practical security tips, early access to new privacy tools, and helpful advice you won't find on our blog.
              </p>

              <div className="mb-8 flex items-center justify-center gap-8 flex-wrap">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Weekly Privacy Tips</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Exclusive Guides</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>No Spam, Ever</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="flex-grow min-w-0 px-4 py-3 bg-background/80 backdrop-blur-sm rounded-lg border border-muted focus:border-primary focus:ring-1 focus:ring-primary focus-visible:outline-none"
                />
                <button className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-md active:scale-95 duration-200">
                  Subscribe Free
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Your privacy matters to us. Unsubscribe anytime with one click. By subscribing, you agree to our <a href="#" className="underline hover:text-primary transition-colors">Privacy Policy</a>.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Featured Tool */}
        <div className="featured-tool mt-16 mb-16">
          <motion.div
            className="rounded-3xl overflow-hidden border border-primary/20 bg-gradient-to-br from-card to-card/80 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 relative overflow-hidden flex items-center justify-center bg-transparent rounded-xl">
                    <Image 
                      src="/images/logos/quackr-logo.png" 
                      alt="Quackr Logo" 
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-bold">Try Quackr Today</h3>
                </div>
                
                <p className="text-muted-foreground mb-6">
                  Get a temporary phone number in seconds. Verify accounts, protect your privacy, and avoid spam—all without sharing your personal number.
                </p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Instant phone number activation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>No personal information required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Works with most verification services</span>
                  </li>
                </ul>
                
                <div>
                  <Link
                    href="https://quackr.io?utm_source=website&utm_medium=blog&utm_campaign=TempNumbers"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#212835] text-white font-medium hover:bg-[#2a3344] transition-colors shadow-md active:scale-95 duration-200 border border-[#3a4556]/50"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="mr-2 w-8 h-8 relative flex items-center justify-center bg-transparent rounded-md overflow-hidden">
                      <Image 
                        src="/images/logos/quackr-logo.png" 
                        alt="Quackr Logo" 
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                    Get Started with Quackr
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 text-[#7DE2D1]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-primary/80 to-primary h-64 md:h-auto relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-grid-pattern"></div>
                
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 max-w-xs shadow-xl border border-white/30">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                        </svg>
                      </div>
                      <h4 className="font-semibold">Your Temporary Number</h4>
                    </div>
                    
                    <div className="bg-background rounded-lg p-3 text-center mb-4 border border-muted">
                      <span className="text-xl font-mono tracking-wide">+1 (555) 123-4567</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <span className="w-24 text-muted-foreground">Status:</span>
                        <span className="font-medium flex items-center">
                          <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                          Active
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="w-24 text-muted-foreground">Expires in:</span>
                        <span className="font-medium">23 hours, 45 min</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="w-24 text-muted-foreground">SMS Received:</span>
                        <span className="font-medium">3</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 