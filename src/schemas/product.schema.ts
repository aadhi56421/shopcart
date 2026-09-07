import { z } from "zod";

/**
 * Shape of a single product as returned by https://dummyjson.com/products.
 * Only the fields the UI actually uses are validated - the real API returns
 * more, but we don't want the app to break if unrelated fields change shape.
 */
export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  rating: z.number(),
  thumbnail: z.string(),
});

export const productsResponseSchema = z.object({
  products: z.array(productSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

export type Product = z.infer<typeof productSchema>;
export type ProductsResponse = z.infer<typeof productsResponseSchema>;
