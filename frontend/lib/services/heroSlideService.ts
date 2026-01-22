import { graphqlRequest } from '@/lib/graphql/client';
import { GET_HERO_SLIDES_QUERY } from '@/lib/graphql/queries';

export interface HeroSlide {
  id: string;
  title: string;
  slug: string;
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  slideSubtitle: string;
  slideDescription: string;
  slideCtaText: string;
  slideCtaLink: string;
  slideTextColor: string;
  slideOverlay: boolean;
  slidePosition: number;
  slideVideo?: string;
  status?: string;
}

export interface HeroSlidesResponse {
  heroSlides: {
    nodes: HeroSlide[];
  };
}

/**
 * Fetch all hero slides from WordPress
 */
export async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    const data = await graphqlRequest<HeroSlidesResponse>(GET_HERO_SLIDES_QUERY);

    // Check if data is null or undefined
    if (!data) {
      return [];
    }

    // Check if heroSlides exists in the response
    if (!data.heroSlides || !Array.isArray(data.heroSlides.nodes)) {
      return [];
    }

    // Sort slides by position
    const slides = data.heroSlides.nodes.sort((a, b) => {
      return (a.slidePosition || 0) - (b.slidePosition || 0);
    });

    return slides;
  } catch (error) {
    console.error('Error fetching hero slides:', error);
    return [];
  }
}
