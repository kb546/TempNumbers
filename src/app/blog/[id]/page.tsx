import { blogPosts } from '@/data/blogPosts';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostContent from '@/components/BlogPostContent';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = blogPosts.find((post) => post.id === parseInt(params.id));
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function BlogPost({ params }: { params: { id: string } }) {
  const post = blogPosts.find((post) => post.id === parseInt(params.id));

  if (!post) {
    notFound();
  }

  return <BlogPostContent post={post} />;
} 