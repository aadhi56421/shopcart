import { useProducts } from "../hooks/useProducts";
import { useProductFilters } from "../hooks/useProductFilters";
import { ProductFilters } from "../components/ProductFilters";
import { ProductCard } from "../components/ProductCard";
import { LoadingState } from "../components/states/LoadingState";
import { ErrorState } from "../components/states/ErrorState";
import { EmptyState } from "../components/states/EmptyState";

export function ProductListPage() {
  const { data: products, isLoading, isError, error, refetch } = useProducts();
  const filters = useProductFilters(products);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6">
      <h1 className="text-2xl font-semibold text-slate-900">Products</h1>

      {!isLoading && !isError && <ProductFilters {...filters} />}

      {isLoading && <LoadingState />}

      {isError && (
        <ErrorState
          message={error instanceof Error ? error.message : "Failed to load products."}
          onRetry={() => refetch()}
        />
      )}

      {!isLoading && !isError && products && products.length === 0 && (
        <EmptyState title="No products available right now." />
      )}

      {!isLoading && !isError && products && products.length > 0 && filters.filteredProducts.length === 0 && (
        <EmptyState
          title="No products match your search."
          description="Try adjusting or clearing your filters."
          action={
            <button
              type="button"
              onClick={filters.clearFilters}
              className="mt-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
            >
              Clear filters
            </button>
          }
        />
      )}

      {!isLoading && !isError && filters.filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filters.filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
