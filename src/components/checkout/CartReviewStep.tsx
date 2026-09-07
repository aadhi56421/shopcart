import type { CartItem } from "../../store/cartStore";
import type { CartTotals } from "../../utils/cartCalculations";
import { CartItemRow } from "../cart/CartItemRow";
import { CartSummary } from "../cart/CartSummary";

interface CartReviewStepProps {
  items: CartItem[];
  totals: CartTotals;
  onContinue: () => void;
}

export function CartReviewStep({ items, totals, onContinue }: CartReviewStepProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        {items.map((item) => (
          <CartItemRow key={item.id} item={item} readOnly />
        ))}
      </div>

      <div>
        <CartSummary totals={totals} isCheckoutAllowed>
          <button
            type="button"
            onClick={onContinue}
            className="mt-4 w-full rounded-md bg-slate-900 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            Continue to Shipping
          </button>
        </CartSummary>
      </div>
    </div>
  );
}
