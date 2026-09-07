import type { CartItem } from "../../store/cartStore";
import type { CartTotals } from "../../utils/cartCalculations";
import type { ShippingFormData } from "../../schemas/shipping.schema";
import { CartItemRow } from "../cart/CartItemRow";
import { CartSummary } from "../cart/CartSummary";

interface PaymentSummaryStepProps {
  items: CartItem[];
  totals: CartTotals;
  shipping: ShippingFormData;
  onBack: () => void;
  onPlaceOrder: () => void;
}

export function PaymentSummaryStep({
  items,
  totals,
  shipping,
  onBack,
  onPlaceOrder,
}: PaymentSummaryStepProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
      <div className="flex flex-col gap-4">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-2 font-semibold text-slate-900">Shipping details</h2>
          <dl className="grid grid-cols-1 gap-1 text-sm text-slate-700 sm:grid-cols-2">
            <div>
              <dt className="text-slate-500">Full name</dt>
              <dd>{shipping.fullName}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Email</dt>
              <dd>{shipping.email}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Phone</dt>
              <dd>{shipping.phone}</dd>
            </div>
            <div>
              <dt className="text-slate-500">City</dt>
              <dd>{shipping.city}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-slate-500">Address</dt>
              <dd>
                {shipping.address}, {shipping.postalCode}
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-2 font-semibold text-slate-900">Cart items</h2>
          {items.map((item) => (
            <CartItemRow key={item.id} item={item} readOnly />
          ))}
        </div>
      </div>

      <div>
        <CartSummary totals={totals} isCheckoutAllowed>
          <div className="mt-4 flex flex-col gap-2">
            <button
              type="button"
              onClick={onPlaceOrder}
              className="w-full rounded-md bg-emerald-600 py-2 text-sm font-medium text-white hover:bg-emerald-700"
            >
              Place Order
            </button>
            <button
              type="button"
              onClick={onBack}
              className="w-full rounded-md border border-slate-300 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Back
            </button>
          </div>
        </CartSummary>
      </div>
    </div>
  );
}
