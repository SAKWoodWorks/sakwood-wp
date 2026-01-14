import { graphqlRequest } from '@/lib/graphql/client';
import { GET_BLOG_POSTS_QUERY, GET_BLOG_POST_QUERY } from '@/lib/graphql/queries';
import { BlogPost, BlogPostsResponse, BlogPostResponse } from '@/lib/types';
import { APP_CONFIG } from '@/lib/config/constants';

// Fallback blog posts when WordPress API is not available
const FALLBACK_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Choosing the Right Plywood for Your Project',
    slug: 'choosing-right-plywood',
    excerpt: 'Learn about the different types of plywood and how to select the best one for your construction needs.',
    date: new Date().toISOString(),
    featuredImage: {
      node: {
        sourceUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop',
        altText: 'Plywood sheets stacked',
      },
    },
    author: {
      node: {
        name: 'SAK WoodWorks Team',
      },
    },
    categories: {
      nodes: [
        { name: 'Tips & Guides', slug: 'tips-guides' },
      ],
    },
    tags: {
      nodes: [],
    },
  },
  {
    id: '2',
    title: 'Understanding Wood Grades and Specifications',
    slug: 'understanding-wood-grades',
    excerpt: 'A comprehensive guide to wood grades, what they mean, and how they affect your construction projects.',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    featuredImage: {
      node: {
        sourceUrl: 'https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=800&auto=format&fit=crop',
        altText: 'Wood texture close-up',
      },
    },
    author: {
      node: {
        name: 'SAK WoodWorks Team',
      },
    },
    categories: {
      nodes: [
        { name: 'Education', slug: 'education' },
      ],
    },
    tags: {
      nodes: [],
    },
  },
  {
    id: '3',
    title: 'Sustainable Sourcing in the Timber Industry',
    slug: 'sustainable-sourcing-timber',
    excerpt: 'How the timber industry is embracing sustainable practices and what it means for your projects.',
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    featuredImage: {
      node: {
        sourceUrl: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&auto=format&fit=crop',
        altText: 'Forest with trees',
      },
    },
    author: {
      node: {
        name: 'SAK WoodWorks Team',
      },
    },
    categories: {
      nodes: [
        { name: 'Sustainability', slug: 'sustainability' },
      ],
    },
    tags: {
      nodes: [],
    },
  },
];

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const data = await graphqlRequest<BlogPostsResponse>(GET_BLOG_POSTS_QUERY, {
      first: 10,
    });
    return data?.posts?.nodes || [];
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    return FALLBACK_BLOG_POSTS;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const data = await graphqlRequest<BlogPostResponse>(GET_BLOG_POST_QUERY, { slug });
    return data?.post || null;
  } catch (error) {
    console.error('Failed to fetch blog post:', error);
    return null;
  }
}
