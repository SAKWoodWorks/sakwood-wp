export interface BlogImage {
  node: {
    sourceUrl: string;
    altText?: string;
    caption?: string;
  };
}

export interface BlogAuthor {
  node: {
    name: string;
    avatar?: {
      url?: string;
    };
  };
}

export interface BlogCategory {
  name: string;
  slug: string;
}

export interface BlogTag {
  name: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  date: string;
  language?: string;
  featuredImage?: BlogImage;
  author?: BlogAuthor;
  categories?: {
    nodes: BlogCategory[];
  };
  tags?: {
    nodes: BlogTag[];
  };
}

export interface BlogPostsResponse {
  posts: {
    nodes: BlogPost[];
  };
}

export interface BlogPostResponse {
  post: BlogPost | null;
}
