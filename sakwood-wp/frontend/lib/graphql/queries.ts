import { ProductsResponse, ProductResponse, MenuResponse, BlogPostsResponse, BlogPostResponse, PromoBannersResponse } from '@/lib/types';

export const GET_PRODUCT_CATEGORIES_QUERY = `
  query GetProductCategories {
    productCategories(first: 100, where: { hideEmpty: true }) {
      nodes {
        id
        name
        slug
        count
        description
      }
    }
  }
`;

export const GET_HERO_SLIDES_QUERY = `
  query GetHeroSlides {
    heroSlides(first: 10, where: {status: PUBLISH}) {
      nodes {
        id
        title
        slug
        status
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        slideSubtitle
        slideDescription
        slideCtaText
        slideCtaLink
        slideTextColor
        slideOverlay
        slidePosition
        slideVideo
      }
    }
  }
`;

export const GET_PRODUCTS_QUERY = `
  query GetProducts($first: Int) {
    products(first: $first) {
      nodes {
        id
        databaseId
        name
        slug
        image {
          sourceUrl
        }
        width
        length
        thickness
        volume
        ... on SimpleProduct {
          price
          regularPrice
        }
      }
    }
  }
`;

export const GET_PRODUCT_QUERY = `
  query GetProduct($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      databaseId
      name
      slug
      description
      image {
        sourceUrl
      }
      galleryImages {
        nodes {
          sourceUrl
          altText
        }
      }
      width
      length
      thickness
      volume
      ... on SimpleProduct {
        price
        regularPrice
      }
    }
  }
`;

export const GET_MENU_QUERY = `
  query GetMenu($location: MenuLocationEnum!) {
    menuItems(where: { location: $location }) {
      nodes {
        id
        label
        path
        url
        target
        description
        parentId
        order
      }
    }
  }
`;

export const GET_BLOG_POSTS_QUERY = `
  query GetBlogPosts($first: Int) {
    posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        title
        slug
        excerpt
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        author {
          node {
            name
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        tags {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

export const GET_BLOG_POST_QUERY = `
  query GetBlogPost($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      slug
      content
      date
      featuredImage {
        node {
          sourceUrl
          altText
          caption
        }
      }
      author {
        node {
          name
          avatar {
            url
          }
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      tags {
        nodes {
          name
          slug
        }
      }
    }
  }
`;

export const GET_PROMO_BANNERS_QUERY = `
  query GetPromoBanners {
    promoBanners(first: 20, where: {status: PUBLISH, orderby: {field: DATE, order: DESC}}) {
      nodes {
        id
        databaseId
        title
        slug
        date
        bannerType
        bannerContentTh
        bannerContentEn
        bannerLink
        buttonTextTh
        buttonTextEn
        backgroundColor
        textColor
        bannerImage {
          sourceUrl
          altText
          mediaItemId
        }
        scheduleStart
        scheduleEnd
        targeting {
          deviceTypes
          showOnPages
          visitorType
          maxImpressions
          displayDelay
        }
        abTestGroup
        isActive
      }
    }
  }
`;
