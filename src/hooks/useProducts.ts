import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";

/**
 * Thin wrapper around useQuery for the product list. Kept as its own hook
 * (rather than calling useQuery directly in components) so the query key and
 * fetch function live in one place and any component that needs products
 * gets the same cache entry.
 */
export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    select: (data) => data.products,
  });
}
