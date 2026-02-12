import { graphqlRequest } from '@/lib/graphql/client';
import { GET_BLOG_POSTS_QUERY, GET_BLOG_POST_QUERY } from '@/lib/graphql/queries';
import { BlogPost, BlogPostsResponse, BlogPostResponse, BlogImage } from '@/lib/types';
import { APP_CONFIG } from '@/lib/config/constants';

/**
 * Transform internal Docker URLs to publicly accessible URLs
 * Replaces http://sak_wp:80/ with http://localhost:8006/
 */
function transformImageUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  return url.replace('http://sak_wp:80/', 'http://localhost:8006/');
}

/**
 * Transform blog image URLs
 */
function transformBlogImage(image?: BlogImage): BlogImage | undefined {
  if (!image) return undefined;
  const transformedUrl = transformImageUrl(image.node.sourceUrl);
  if (!transformedUrl) return undefined;
  return {
    node: {
      ...image.node,
      sourceUrl: transformedUrl,
    },
  };
}

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

/**
 * Get blog posts via REST API with language filtering
 * Uses custom endpoint: /wp-json/sakwood/v1/posts?language=th
 * Blog posts now work like products - single post with TH/EN translations
 */
export async function getBlogPosts(language: string = 'th'): Promise<BlogPost[]> {
  try {
    const baseUrl = process.env.WORDPRESS_API_URL || process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL?.replace('/graphql', '') || 'http://localhost:8006';
    const url = `${baseUrl}/wp-json/sakwood/v1/posts?language=${language}&per_page=${APP_CONFIG.blogPerPage}`;

    const response = await fetch(url);
    if (!response.ok) {
      console.error('Failed to fetch blog posts:', response.status);
      // Fall back to GraphQL
      return getBlogPostsViaGraphQL();
    }

    const data = await response.json();

    // Handle empty array
    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }

    // Transform featured image URLs for all posts
    return data.map((post: any) => ({
      ...post,
      featuredImage: transformBlogImage(post.featuredImage),
    }));
  } catch (error) {
    console.error('Error fetching blog posts via REST API:', error);
    // Fall back to GraphQL
    return getBlogPostsViaGraphQL();
  }
}

/**
 * Fallback: Get blog posts via GraphQL (no language filtering)
 */
async function getBlogPostsViaGraphQL(): Promise<BlogPost[]> {
  try {
    const data = await graphqlRequest<BlogPostsResponse>(GET_BLOG_POSTS_QUERY, {
      first: 10,
    });
    const posts = data?.posts?.nodes || [];

    // Transform featured image URLs for all posts
    return posts.map(post => ({
      ...post,
      featuredImage: transformBlogImage(post.featuredImage),
    }));
  } catch (error) {
    console.error('Failed to fetch blog posts via GraphQL:', error);
    return FALLBACK_BLOG_POSTS;
  }
}

/**
 * Get single blog post by slug with language filtering
 * Uses custom REST API endpoint: /wp-json/sakwood/v1/posts/{slug}?language=th
 */
export async function getBlogPostBySlug(slug: string, language: string = 'th'): Promise<BlogPost | null> {
  try {
    // The slug from Next.js is already decoded, but we need to URL-encode it for the API request
    // This ensures Thai characters are properly encoded for the HTTP request
    const encodedSlug = encodeURIComponent(slug);
    const baseUrl = process.env.WORDPRESS_API_URL || process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL?.replace('/graphql', '') || 'http://localhost:8006';
    const url = `${baseUrl}/wp-json/sakwood/v1/posts/${encodedSlug}?language=${language}`;

    const response = await fetch(url);

    if (!response.ok) {
      // If 404, post not found
      if (response.status === 404) {
        return null;
      }
      console.error('Failed to fetch blog post:', response.status);
      // Fall back to GraphQL
      return getBlogPostBySlugViaGraphQL(slug);
    }

    const post = await response.json();

    if (!post || (post as any).code === 'post_not_found') {
      return null;
    }

    // Transform featured image URLs
    return {
      ...post,
      featuredImage: transformBlogImage(post.featuredImage),
    };
  } catch (error) {
    console.error('Error fetching blog post via REST API:', error);
    // Fall back to GraphQL
    return getBlogPostBySlugViaGraphQL(slug);
  }
}

/**
 * Fallback: Get blog post by slug via GraphQL (no language filtering)
 */
async function getBlogPostBySlugViaGraphQL(slug: string): Promise<BlogPost | null> {
  try {
    const data = await graphqlRequest<BlogPostResponse>(GET_BLOG_POST_QUERY, { slug });
    const post = data?.post;

    if (!post) return null;

    // Transform featured image URLs
    return {
      ...post,
      featuredImage: transformBlogImage(post.featuredImage),
    };
  } catch (error) {
    console.error('Failed to fetch blog post via GraphQL:', error);
    return null;
  }
}
