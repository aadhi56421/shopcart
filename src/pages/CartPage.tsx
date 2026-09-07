import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { calculateCartTotals, isCheckoutAllowed } from "../utils/cartCalculations";
import { CartItemRow } from "../components/cart/CartItemRow";
import { CartSummary } from "../components/cart/CartSummary";
import { EmptyState } from "../components/states/EmptyState";

export function CartPage() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const navigate = useNavigate();

  const totals = calculateCartTotals(items);
  const canCheckout = isCheckoutAllowed(totals.subtotal);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-6">
        <EmptyState
          title="Your cart is empty."
          description="Browse products and add something you like."
          action={
            <Link
              to="/"
              className="mt-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
            >
              Browse products
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[1fr_320px]">
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-900">Your Cart</h1>
          <button
            type="button"
            onClick={clearCart}
            className="text-sm text-slate-500 hover:text-red-600"
          >
            Clear cart
          </button>
        </div>
        {items.map((item) => (
          <CartItemRow key={item.id} item={item} />
        ))}
      </div>

      <div className="lg:sticky lg:top-20 lg:self-start">
        <CartSummary totals={totals} isCheckoutAllowed={canCheckout}>
          <button
            type="button"
            disabled={!canCheckout}
            onClick={() => navigate("/checkout")}
            className="mt-4 w-full rounded-md bg-slate-900 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Proceed to Checkout
          </button>
        </CartSummary>
      </div>
    </div>
  );
}
