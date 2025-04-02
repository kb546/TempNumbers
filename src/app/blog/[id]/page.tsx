"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { blogPosts, type BlogPost } from "@/data/blogPosts";

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

// Quackr Introduction HTML with updated utm params and duck image
const quackrIntroHtml = `
  <div class="my-6 p-5 bg-card rounded-xl border border-primary/20 shadow-sm flex flex-col md:flex-row items-center gap-4">
    <div class="w-20 h-20 relative flex-shrink-0 flex items-center justify-center bg-transparent rounded-xl overflow-hidden">
      <img src="/images/logos/quackr-logo.png" alt="Quackr Logo" class="w-full h-full object-contain" />
    </div>
    <div class="flex-grow text-center md:text-left">
      <h3 class="text-lg font-semibold mb-1">What is Quackr?</h3>
      <p class="text-muted-foreground text-sm mb-2">Quackr provides temporary phone numbers for verification and privacy protection. Use them for online registrations, dating apps, marketplaces, and more without exposing your real number.</p>
      <a href="https://quackr.io?utm_source=website&utm_medium=blogpost&utm_campaign=TempNumbers" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-[#7DE2D1] hover:text-[#7DE2D1]/80 font-medium text-sm">
        Try Quackr free
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </a>
    </div>
  </div>
`;

// Process content to add UTM links to Quackr mentions
const processContent = (content: string) => {
  // Replace Quackr mentions with linked version
  const processedContent = content.replace(
    /Quackr/g, 
    '<a href="https://quackr.io?utm_source=website&utm_medium=blogpost&utm_campaign=TempNumbers" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Quackr</a>'
  );
  
  // Insert Quackr intro after first paragraph
  const firstParagraphEnd = processedContent.indexOf('</p>') + 4;
  if (firstParagraphEnd > 4) {
    return processedContent.slice(0, firstParagraphEnd) + quackrIntroHtml + processedContent.slice(firstParagraphEnd);
  }
  
  return processedContent;
};

export default function BlogPost() {
  const { id } = useParams();
  
  // Get the correct post or default to the fallback
  const postId = typeof id === 'string' ? id : "default";
  const post = blogPosts[postId] || blogPosts["default"];

  // Process content to add UTM links
  const processedContent = processContent(post.content);

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
            
            {/* Decorative elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>
            
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
            
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
                  {post.tags.map((tag, index) => (
                    <span
                      key={tag}
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
      
      {/* Content Section with Enhanced Design */}
      <main className="container py-12 px-4 mx-auto max-w-7xl">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between border-b border-muted pb-8 mb-8">
            <Link
              href="/blog"
              className="text-primary hover:text-primary/80 inline-flex items-center gap-2 font-medium group/link relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 group-hover/link:-translate-x-1 transition-transform">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back to Blog
              </span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/50 transform scale-x-0 group-hover/link:scale-x-100 transition-transform origin-left"></span>
            </Link>
            
            <div className="flex items-center">
              <time className="text-sm text-muted-foreground block px-3 py-1 rounded-full bg-muted" dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </time>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-start gap-8 mb-12">
            <div className="md:w-[180px] shrink-0">
              <div className="sticky top-8 flex flex-col items-center md:items-start gap-4">
                <div className="relative w-16 h-16 overflow-hidden rounded-full border-2 border-primary/30 shadow-md">
                  <Image 
                    src="/ProfilePicture.png" 
                    alt="TempNumbers Logo" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground block mb-1">Posted by</span>
                  <p className="font-semibold text-lg">{post.author || "TempNumbers Team"}</p>
                </div>
                <div className="bg-secondary/50 text-secondary-foreground px-3 py-1 rounded-full text-sm flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  {post.readTime}
                </div>
                
                <div className="hidden md:flex flex-col gap-3 mt-6">
                  <span className="text-sm font-medium text-muted-foreground">Share this article</span>
                  <div className="grid grid-cols-3 gap-3">
                    {/* Facebook */}
                    <button 
                      onClick={() => handleShare('facebook')} 
                      aria-label="Share on Facebook"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-[#1877F2]/10 transition-all duration-300 border border-muted shadow-sm hover:shadow transform hover:-translate-y-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                      </svg>
                    </button>
                    
                    {/* Twitter/X */}
                    <button 
                      onClick={() => handleShare('twitter')} 
                      aria-label="Share on X (Twitter)"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-[#1DA1F2]/10 transition-all duration-300 border border-muted shadow-sm hover:shadow transform hover:-translate-y-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1DA1F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                      </svg>
                    </button>
                    
                    {/* LinkedIn */}
                    <button 
                      onClick={() => handleShare('linkedin')} 
                      aria-label="Share on LinkedIn"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-[#0A66C2]/10 transition-all duration-300 border border-muted shadow-sm hover:shadow transform hover:-translate-y-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A66C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                        <rect width="4" height="12" x="2" y="9"/>
                        <circle cx="4" cy="4" r="2"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-grow min-w-0">
              <motion.div
                className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-semibold prose-h2:text-3xl prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-primary/90 prose-img:rounded-xl prose-pre:bg-muted prose-pre:text-muted-foreground"
                variants={fadeIn}
                custom={0.4}
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />
              
              <div className="mt-12 flex flex-col items-center md:hidden">
                <span className="text-sm font-medium text-muted-foreground mb-4">Share this article</span>
                <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
                  {/* Facebook */}
                  <button 
                    onClick={() => handleShare('facebook')} 
                    aria-label="Share on Facebook"
                    className="w-full aspect-square flex items-center justify-center rounded-xl bg-white hover:bg-[#1877F2]/10 transition-all duration-300 border border-muted shadow-sm hover:shadow transform hover:-translate-y-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </button>

                  {/* Twitter/X */}
                  <button 
                    onClick={() => handleShare('twitter')} 
                    aria-label="Share on X (Twitter)"
                    className="w-full aspect-square flex items-center justify-center rounded-xl bg-white hover:bg-[#1DA1F2]/10 transition-all duration-300 border border-muted shadow-sm hover:shadow transform hover:-translate-y-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1DA1F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                    </svg>
                  </button>
                  
                  {/* LinkedIn */}
                  <button 
                    onClick={() => handleShare('linkedin')} 
                    aria-label="Share on LinkedIn"
                    className="w-full aspect-square flex items-center justify-center rounded-xl bg-white hover:bg-[#0A66C2]/10 transition-all duration-300 border border-muted shadow-sm hover:shadow transform hover:-translate-y-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0A66C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect width="4" height="12" x="2" y="9"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Call To Action */}
              <div className="mt-16 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/30 p-10 shadow-xl overflow-hidden relative">
                <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Ready to Protect Your Privacy?</h2>
                  <div className="h-1 w-20 bg-primary/70 mx-auto mb-6 rounded-full"></div>
                  <p className="mb-8 text-center max-w-xl mx-auto text-muted-foreground">
                    Get started with Quackr today and take control of your digital privacy with temporary phone numbers that protect your identity.
                  </p>
                  <div className="flex justify-center">
                    <Link
                      href="https://quackr.io?utm_source=website&utm_medium=blogpost&utm_campaign=TempNumbers"
                      className="inline-flex items-center justify-center px-5 py-2 bg-[#212835] text-white rounded-lg text-sm font-medium hover:bg-[#2a3344] transition-colors border border-[#3a4556]/50"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="flex items-center">
                        <div className="mr-2 w-7 h-7 relative flex items-center justify-center bg-transparent rounded-md overflow-hidden">
                          <Image 
                            src="/images/logos/quackr-logo.png" 
                            alt="Quackr Logo" 
                            width={28}
                            height={28}
                            className="object-contain"
                          />
                        </div>
                        Try Quackr Now
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Related Articles - You could add this section in the future */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 