import { graphqlRequest } from '@/lib/graphql/client';
import { GET_PRODUCTS_QUERY, GET_PRODUCT_QUERY } from '@/lib/graphql/queries';
import { Product, ProductsResponse, ProductResponse } from '@/lib/types';
import { APP_CONFIG } from '@/lib/config/constants';

export async function getProducts(): Promise<Product[]> {
  const data = await graphqlRequest<ProductsResponse>(GET_PRODUCTS_QUERY, {
    first: APP_CONFIG.productsPerPage,
  });
  return data?.products?.nodes || [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const data = await graphqlRequest<ProductResponse>(GET_PRODUCT_QUERY, { slug });
  return data?.product || null;
}
