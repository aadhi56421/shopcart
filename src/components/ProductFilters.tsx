import type { useProductFilters } from "../hooks/useProductFilters";
import { ALL_CATEGORIES } from "../hooks/useProductFilters";

type ProductFiltersState = ReturnType<typeof useProductFilters>;

export function ProductFilters({
  searchTerm,
  setSearchTerm,
  category,
  setCategory,
  categories,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
  hasActiveFilters,
  clearFilters,
}: ProductFiltersState) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:flex-wrap md:items-end">
      <div className="flex-1 min-w-[200px]">
        <label htmlFor="search" className="mb-1 block text-xs font-medium text-slate-600">
          Search
        </label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products by title..."
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
        />
      </div>

      <div className="w-full md:w-44">
        <label htmlFor="category" className="mb-1 block text-xs font-medium text-slate-600">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm capitalize focus:border-slate-500 focus:outline-none"
        >
          <option value={ALL_CATEGORIES}>All categories</option>
          {categories.map((c) => (
            <option key={c} value={c} className="capitalize">
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="flex w-full gap-2 md:w-40">
        <div>
          <label htmlFor="minPrice" className="mb-1 block text-xs font-medium text-slate-600">
            Min $
          </label>
          <input
            id="minPrice"
            type="number"
            min={0}
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
            className="w-full rounded-md border border-slate-300 px-2 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="maxPrice" className="mb-1 block text-xs font-medium text-slate-600">
            Max $
          </label>
          <input
            id="maxPrice"
            type="number"
            min={0}
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
            className="w-full rounded-md border border-slate-300 px-2 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="w-full md:w-44">
        <label htmlFor="sort" className="mb-1 block text-xs font-medium text-slate-600">
          Sort by
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating: High to Low</option>
        </select>
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="h-fit rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
