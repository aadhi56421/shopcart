import type { ReactNode } from "react";
import type { CartTotals } from "../../utils/cartCalculations";
import { formatCurrency, MIN_CHECKOUT_VALUE } from "../../utils/cartCalculations";

interface CartSummaryProps {
  totals: CartTotals;
  isCheckoutAllowed: boolean;
  children?: ReactNode;
}

export function CartSummary({ totals, isCheckoutAllowed, children }: CartSummaryProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 font-semibold text-slate-900">Order Summary</h2>

      <dl className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-slate-600">Subtotal</dt>
          <dd className="text-slate-900">{formatCurrency(totals.subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-600">Tax (5%)</dt>
          <dd className="text-slate-900">{formatCurrency(totals.tax)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-600">Discount</dt>
          <dd className={totals.discount > 0 ? "text-emerald-600" : "text-slate-900"}>
            {totals.discount > 0 ? `-${formatCurrency(totals.discount)}` : formatCurrency(0)}
          </dd>
        </div>
        <div className="mt-1 flex justify-between border-t border-slate-200 pt-2 text-base font-semibold">
          <dt>Total</dt>
          <dd>{formatCurrency(totals.total)}</dd>
        </div>
      </dl>

      {!isCheckoutAllowed && (
        <p className="mt-3 rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-800">
          Add {formatCurrency(MIN_CHECKOUT_VALUE - totals.subtotal)} more to reach the{" "}
          {formatCurrency(MIN_CHECKOUT_VALUE)} minimum required for checkout.
        </p>
      )}

      {children}
    </div>
  );
}
