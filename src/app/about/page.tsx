"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

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

const socialIcons = {
  TikTok: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-6 w-6">
      <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" fill="currentColor"/>
    </svg>
  ),
  Instagram: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-6 w-6">
      <defs>
        <radialGradient id="instagram-gradient-about" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497"/>
          <stop offset="5%" stopColor="#fdf497"/>
          <stop offset="45%" stopColor="#fd5949"/>
          <stop offset="60%" stopColor="#d6249f"/>
          <stop offset="90%" stopColor="#285AEB"/>
        </radialGradient>
      </defs>
      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" fill="url(#instagram-gradient-about)"/>
    </svg>
  ),
  YouTube: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="h-6 w-6">
      <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" fill="#FF0000"/>
    </svg>
  ),
};

export default function About() {
  const socials = [
    {
      name: "TikTok",
      url: "https://www.tiktok.com/@temp_numbers",
      utm: "utm_source=website&utm_medium=about&utm_campaign=TempNumbers",
      followers: "12.5K",
      handle: "@temp_numbers"
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/temp_numbers",
      utm: "utm_source=website&utm_medium=about&utm_campaign=TempNumbers",
      followers: "8.7K",
      handle: "@temp_numbers"
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@TempNumbers",
      utm: "utm_source=website&utm_medium=about&utm_campaign=TempNumbers",
      followers: "5.2K",
      handle: "TempNumbers"
    }
  ];

  const privacyFeatures = [
    {
      title: "Anonymous Verification",
      description: "Keep your identity safe with phone verification that doesn't expose your personal number.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
        </svg>
      )
    },
    {
      title: "Digital Privacy",
      description: "Keep your online footprint small and control what personal info gets shared online.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
      )
    },
    {
      title: "One-Time Numbers",
      description: "Use temporary numbers for services you don't fully trust or just need once.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
        </svg>
      )
    }
  ];

  return (
    <div>
      {/* Hero Section with Gradient Background */}
      <section className="relative w-full py-28 overflow-hidden bg-gradient-to-b from-background via-background/95 to-secondary/30">
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
              className="relative w-32 h-32 mb-8 overflow-hidden rounded-full border-4 border-primary/50 shadow-lg shadow-primary/20"
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
              className="text-5xl md:text-6xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"
              variants={fadeIn}
              custom={0.2}
            >
              About TempNumbers
            </motion.h1>
            
            <motion.div 
              className="flex gap-2 mb-8"
              variants={fadeIn}
              custom={0.3}
            >
              <span className="px-4 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">Privacy Simplified</span>
              <span className="px-4 py-1 text-sm font-medium rounded-full bg-secondary text-secondary-foreground border border-secondary/20">Since 2025</span>
            </motion.div>
            
            <motion.p 
              className="text-xl md:text-2xl max-w-2xl text-muted-foreground leading-relaxed"
              variants={fadeIn}
              custom={0.4}
            >
              Helping you take control of your online identity in today's connected world.
            </motion.p>
          </motion.div>
        </div>
      </section>
      
      {/* Main Content */}
      <div className="container py-16 px-4 mx-auto max-w-7xl">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* Mission Section with Visual Design */}
          <motion.div 
            className="mb-20 p-8 rounded-2xl border border-primary/10 bg-gradient-to-br from-card to-card/50 shadow-xl relative overflow-hidden"
            variants={fadeIn}
          >
            <div className="absolute -right-12 -top-12 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
            
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              </span>
              Our Mission
            </h2>
            
            <p className="text-lg mb-6 leading-relaxed text-foreground/90">
              At TempNumbers, we believe everyone should have control over their online privacy.
              Our mission is to help people protect their personal information,
              starting with one of your most important pieces of data: your phone number.
            </p>
            
            <p className="text-lg leading-relaxed text-foreground/90">
              We're focused on teaching people about digital privacy and offering real solutions
              through our partnership with Quackr. By sharing helpful content and practical tools,
              we help people stay private in today's connected world.
            </p>
          </motion.div>
          
          {/* Privacy Features */}
          <motion.div
            className="mb-20"
            variants={fadeIn}
            custom={0.1}
          >
            <h2 className="text-3xl font-bold mb-10 text-center">Our Privacy Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {privacyFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="p-8 rounded-2xl border border-primary/10 bg-card hover:bg-card/80 shadow-md hover:shadow-lg transition-all duration-300 hover:border-primary/20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-16 h-16 mb-6 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Connect With Us */}
          <motion.div
            className="mb-20"
            variants={fadeIn}
            custom={0.2}
          >
            <h2 className="text-3xl font-bold mb-6 text-center">Connect With Us</h2>
            <div className="h-1 w-20 bg-primary/50 mx-auto mb-10 rounded-full"></div>
            <p className="text-lg mb-10 text-center text-muted-foreground max-w-2xl mx-auto">
              Join our growing community of privacy fans. Follow us on social media for the latest 
              privacy tips, helpful content, and updates.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {socials.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={`${social.url}?${social.utm}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 rounded-2xl bg-gradient-to-br from-card to-card/90 border border-primary/10 shadow-md hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-300"></div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 mb-4 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      {socialIcons[social.name as keyof typeof socialIcons]}
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{social.name}</h3>
                    <p className="text-primary mb-4">{social.handle}</p>
                    <span className="px-3 py-1 text-sm rounded-full bg-secondary/50 text-secondary-foreground">
                      {social.followers} followers
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/40 p-10 shadow-xl overflow-hidden relative"
            variants={fadeIn}
            custom={0.3}
          >
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
            
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Ready to Take Control?</h2>
              <div className="h-1 w-20 bg-primary mx-auto mb-6 rounded-full"></div>
              <p className="text-lg mb-8 text-center max-w-xl mx-auto">
                Start protecting your privacy today with a second phone number from Quackr.
                Secure, private, and easy to use.
              </p>
              <div className="flex justify-center">
                <Link
                  href="https://quackr.io?utm_source=website&utm_medium=about&utm_campaign=TempNumbers"
                  className="group relative px-8 py-4 rounded-full bg-[#212835] text-white font-medium text-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:bg-[#2a3344] transition-all duration-300 overflow-hidden border border-[#3a4556]/50"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <div className="w-8 h-8 relative flex items-center justify-center bg-transparent rounded-md overflow-hidden">
                      <Image 
                        src="/images/logos/quackr-logo.png" 
                        alt="Quackr Logo" 
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                    Get Started with Quackr
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#7DE2D1] group-hover:translate-x-1 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                  <span className="absolute inset-0 bg-[#2a3344] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 