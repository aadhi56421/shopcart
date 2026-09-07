import { useMemo, useState } from "react";
import type { Product } from "../schemas/product.schema";

export type SortOption = "default" | "price-asc" | "price-desc" | "rating-desc";

const ALL_CATEGORIES = "all";

export interface PriceRange {
  min: string;
  max: string;
}

const emptyPriceRange: PriceRange = { min: "", max: "" };

/**
 * Encapsulates all search/filter/sort state and logic for the product grid.
 * Pulled out of the page component so ProductListPage stays focused on
 * layout, and so this logic could be reused or tested independently.
 */
export function useProductFilters(products: Product[] | undefined) {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<string>(ALL_CATEGORIES);
  const [priceRange, setPriceRange] = useState<PriceRange>(emptyPriceRange);
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const categories = useMemo(() => {
    if (!products) return [];
    const unique = new Set(products.map((product) => product.category));
    return Array.from(unique).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    const min = priceRange.min ? Number(priceRange.min) : undefined;
    const max = priceRange.max ? Number(priceRange.max) : undefined;
    const search = searchTerm.trim().toLowerCase();

    const filtered = products.filter((product) => {
      const matchesSearch = search ? product.title.toLowerCase().includes(search) : true;
      const matchesCategory = category === ALL_CATEGORIES ? true : product.category === category;
      const matchesMin = min !== undefined && !Number.isNaN(min) ? product.price >= min : true;
      const matchesMax = max !== undefined && !Number.isNaN(max) ? product.price <= max : true;

      return matchesSearch && matchesCategory && matchesMin && matchesMax;
    });

    switch (sortBy) {
      case "price-asc":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "rating-desc":
        return [...filtered].sort((a, b) => b.rating - a.rating);
      default:
        return filtered;
    }
  }, [products, searchTerm, category, priceRange, sortBy]);

  const hasActiveFilters =
    searchTerm !== "" || category !== ALL_CATEGORIES || priceRange.min !== "" || priceRange.max !== "";

  function clearFilters() {
    setSearchTerm("");
    setCategory(ALL_CATEGORIES);
    setPriceRange(emptyPriceRange);
    setSortBy("default");
  }

  return {
    searchTerm,
    setSearchTerm,
    category,
    setCategory,
    categories,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    filteredProducts,
    hasActiveFilters,
    clearFilters,
  };
}

export { ALL_CATEGORIES };
