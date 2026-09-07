import { useCartStore } from "../store/cartStore";
import type { Product } from "../schemas/product.schema";
import { StarRating } from "./StarRating";
import { formatCurrency } from "../utils/cartCalculations";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const quantityInCart = useCartStore(
    (state) => state.items.find((item) => item.id === product.id)?.quantity ?? 0,
  );
  const atMaxQuantity = quantityInCart >= 5;

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="h-44 w-full object-cover"
        loading="lazy"
      />
      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="w-fit rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 capitalize">
          {product.category}
        </span>
        <h3 className="line-clamp-2 font-medium text-slate-900">{product.title}</h3>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-semibold text-slate-900">
            {formatCurrency(product.price)}
          </span>
          <StarRating rating={product.rating} />
        </div>
        <button
          type="button"
          onClick={() => addItem(product)}
          disabled={atMaxQuantity}
          className="mt-3 w-full rounded-md bg-slate-900 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {atMaxQuantity ? "Max quantity in cart" : quantityInCart > 0 ? `In cart (${quantityInCart})` : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
