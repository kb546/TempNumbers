"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Enhanced animation variants
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

// Featured blog content
const featuredBlogs = [
  {
    id: 1,
    title: "Ultimate Guide: How to Protect Your Identity While Gaming Online in 2025",
    excerpt: "Learn how to keep your personal info safe while gaming online. We'll show you how temp phone numbers, VPNs, and better security can stop problems like doxxing, swatting, and account theft when you're playing competitive games.",
    image: "/images/blog/real/gaming-privacy.jpg",
    category: "Gaming",
    date: "April 2, 2025",
    readTime: "7 min read"
  },
  {
    id: 2,
    title: "International Travel Security: Using Temporary Phone Numbers Abroad",
    excerpt: "Stay safe online while traveling with our simple tips. Find out how temp phone numbers can protect you from SIM swapping, location tracking, and data theft when you're using travel apps, public WiFi, and booking services in other countries.",
    image: "/images/blog/real/travel-privacy.jpg",
    category: "Travel",
    date: "March 28, 2025",
    readTime: "6 min read"
  },
  {
    id: 3,
    title: "Digital Identity Protection: Creating Anonymous Online Personas in 2025",
    excerpt: "Learn to stay anonymous online without missing out on the fun. We'll share easy ways to create secure online identities, manage different accounts, and stop websites from connecting your activities across different platforms.",
    image: "/images/blog/real/avatar-privacy.jpg",
    category: "Digital Identity",
    date: "March 22, 2025",
    readTime: "8 min read"
  }
];

// Social media content
const socialContent = [
  {
    platform: "TikTok",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-8 w-8">
        <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" fill="currentColor"/>
      </svg>
    ),
    handle: "@temp_numbers",
    url: "https://www.tiktok.com/@temp_numbers?utm_source=website&utm_medium=homepage&utm_campaign=TempNumbers",
    description: "Quick privacy tips & temporary number hacks",
    followers: "12.5K"
  },
  {
    platform: "Instagram",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-8 w-8">
        <defs>
          <radialGradient id="instagram-gradient-home" cx="30%" cy="107%" r="150%">
            <stop offset="0%" stopColor="#fdf497"/>
            <stop offset="5%" stopColor="#fdf497"/>
            <stop offset="45%" stopColor="#fd5949"/>
            <stop offset="60%" stopColor="#d6249f"/>
            <stop offset="90%" stopColor="#285AEB"/>
          </radialGradient>
        </defs>
        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" fill="url(#instagram-gradient-home)"/>
      </svg>
    ),
    handle: "@temp_numbers",
    url: "https://www.instagram.com/temp_numbers?utm_source=website&utm_medium=homepage&utm_campaign=TempNumbers",
    description: "Privacy education & lifestyle content",
    followers: "8.7K"
  },
  {
    platform: "YouTube",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="h-8 w-8">
        <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" fill="#FF0000"/>
      </svg>
    ),
    handle: "TempNumbers",
    url: "https://www.youtube.com/@TempNumbers?utm_source=website&utm_medium=homepage&utm_campaign=TempNumbers",
    description: "In-depth privacy tutorials & reviews",
    followers: "5.2K"
  }
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section with Creative Background */}
      <section className="relative w-full py-32 md:py-36 overflow-hidden bg-gradient-to-b from-background via-background to-secondary/10">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
        </div>
        
        {/* Decorative blobs */}
        <div className="absolute top-1/3 left-[15%] w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-1/4 right-[10%] w-96 h-96 bg-secondary/30 rounded-full blur-3xl opacity-60"></div>
        
        <motion.div 
          className="container relative px-4 mx-auto max-w-7xl flex flex-col items-center justify-center text-center z-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div 
            className="relative w-40 h-40 mb-8 overflow-hidden rounded-full border-4 border-primary/50 shadow-xl shadow-primary/10"
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
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-foreground"
            variants={fadeIn}
            custom={0.2}
          >
            Protect Your Privacy with <br className="hidden sm:inline" /> 
            <span className="relative inline-block text-primary">
              TempNumbers
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary rounded-full"></span>
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl max-w-3xl mx-auto text-muted-foreground mb-10 leading-relaxed"
            variants={fadeIn}
            custom={0.3}
          >
            Secure temporary phone numbers for all your verification needs.
            <br className="hidden sm:inline" /> No personal information required.
          </motion.p>
          
          <motion.div
            variants={fadeIn}
            custom={0.4}
            className="relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-primary/20 rounded-full blur-md animate-pulse"></div>
            <Link
              href="https://quackr.io?utm_source=website&utm_medium=homepage&utm_campaign=TempNumbers"
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
              Try Quackr Now
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 text-[#7DE2D1]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap gap-3 mt-10 justify-center"
            variants={fadeIn}
            custom={0.5}
          >
            <span className="px-4 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">Anonymous Verification</span>
            <span className="px-4 py-1 text-sm font-medium rounded-full bg-card border border-muted">No Personal Data</span>
            <span className="px-4 py-1 text-sm font-medium rounded-full bg-card border border-muted">Privacy Protection</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Feature Section */}
      <section className="w-full py-20 bg-gradient-to-b from-background via-secondary/20 to-secondary/40 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-background to-transparent"></div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-1/3 left-[5%] w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-[5%] w-64 h-64 bg-secondary/30 rounded-full blur-3xl"></div>
        
        <div className="container relative px-4 mx-auto max-w-7xl z-10">
          <div className="max-w-xl mx-auto text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Featured Content
            </motion.h2>
            <motion.div 
              className="h-1 w-20 bg-primary/70 mx-auto mb-6 rounded-full"
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: 80 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            ></motion.div>
            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Explore our latest articles on privacy protection and digital security
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
            {/* Blog Preview Cards with enhanced styling */}
            {featuredBlogs.map((blog, index) => (
              <motion.div 
                key={blog.id} 
                className="rounded-xl border border-primary/10 bg-card shadow-lg hover:shadow-xl overflow-hidden transition-all hover:border-primary/40 group flex flex-col h-full hover:translate-y-[-6px]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="relative h-56 bg-muted overflow-hidden">
          <Image
                    src={blog.image} 
                    alt={blog.title}
                    fill
                    className="object-cover z-0 transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/70 z-10" />
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="px-3 py-1 bg-primary/80 text-white text-xs rounded-full font-medium shadow-sm">
                      {blog.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 md:p-7 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-muted-foreground">{blog.date}</span>
                    <span className="text-xs text-muted-foreground bg-secondary/30 px-2 py-1 rounded-md">
                      {blog.readTime || "5 min read"}
                    </span>
                  </div>
                  <h3 className="font-semibold text-xl mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">{blog.title}</h3>
                  <p className="text-muted-foreground mb-5 line-clamp-3 flex-grow leading-relaxed">{blog.excerpt}</p>
                  <Link 
                    href={`/blog/${blog.id}`} 
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
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link 
                href="/blog" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-card hover:bg-card/80 border border-primary/20 hover:border-primary/40 font-medium transition-colors shadow-sm hover:shadow-md"
              >
                View all articles
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Media Section with Enhanced Design */}
      <section className="w-full py-20 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-secondary/40 to-transparent"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/3 right-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-[5%] w-48 h-48 bg-secondary/30 rounded-full blur-3xl"></div>
        
        <div className="container relative px-4 mx-auto max-w-7xl z-10">
          <div className="max-w-xl mx-auto text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Follow Our Community
            </motion.h2>
            <motion.div 
              className="h-1 w-20 bg-primary/70 mx-auto mb-6 rounded-full"
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: 80 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            ></motion.div>
            <motion.p
              className="text-muted-foreground md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Join thousands of privacy enthusiasts getting daily tips, educational content, and updates on protecting your digital identity.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
            {socialContent.map((social, index) => (
              <motion.a
                key={social.platform}
                href={social.url}
          target="_blank"
          rel="noopener noreferrer"
                className="rounded-2xl bg-gradient-to-br from-card to-card/95 border border-primary/10 shadow-lg p-8 flex flex-col items-center text-center group transition-all hover:shadow-xl hover:border-primary/30 relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-300"></div>
                
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300 shadow-sm">
                  {social.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2">{social.platform}</h3>
                <p className="text-primary font-medium mb-4">{social.handle}</p>
                <p className="text-muted-foreground mb-6 leading-relaxed">{social.description}</p>
                <div className="flex items-center justify-center gap-2 text-sm font-semibold bg-primary/10 px-4 py-2 rounded-full group-hover:bg-primary/20 transition-colors">
                  <span>{social.followers}</span>
                  <span className="text-muted-foreground">followers</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="w-full py-16 px-4">
        <motion.div
          className="max-w-4xl mx-auto rounded-3xl border border-primary/20 bg-gradient-to-br from-card via-card/80 to-secondary/30 p-10 md:p-12 shadow-xl relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Become a Privacy Insider</h2>
            <div className="h-1 w-16 bg-primary/70 mx-auto mb-6 rounded-full"></div>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto md:text-lg">
              Join over 20,000 people who care about privacy. Get our newsletter with practical security tips, early access to new privacy tools, and helpful advice you won't find on our blog.
            </p>

            <div className="mb-6 flex items-center justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Weekly Privacy Tips</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Exclusive Guides</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">No Spam, Ever</span>
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
      </section>
    </main>
  );
}
