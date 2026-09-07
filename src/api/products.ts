import { productsResponseSchema, type ProductsResponse } from "../schemas/product.schema";

const PRODUCTS_URL = "https://dummyjson.com/products?limit=100";

/**
 * Fetches the product catalogue and validates the response shape with Zod
 * before it ever reaches a component. If the API changes shape or returns
 * something unexpected, this throws and TanStack Query surfaces it as an
 * error state instead of letting bad data flow into the UI.
 */
export async function fetchProducts(): Promise<ProductsResponse> {
  const response = await fetch(PRODUCTS_URL);

  if (!response.ok) {
    throw new Error(`Failed to load products (status ${response.status})`);
  }

  const data = await response.json();
  const result = productsResponseSchema.safeParse(data);

  if (!result.success) {
    console.error("Product API response failed validation:", result.error);
    throw new Error("Product data from the server was in an unexpected format.");
  }

  return result.data;
}
