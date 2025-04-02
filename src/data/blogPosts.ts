export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  tags: string[];
  content: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Why Every Consumer Needs a Second Phone Number: Privacy Guide 2025",
    excerpt:
      "Discover why having a second phone number is crucial for privacy in 2025. Learn how TempNumbers can help protect your personal information.",
    date: "April 15, 2025",
    author: "Privacy Team",
    readTime: "5 min read",
    tags: ["Privacy", "Security", "Personal Data"],
    content: `...`,
    image: "/images/blog/real/phone-privacy.jpg"
  },
  // ... rest of your blog posts
]; 