import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { calculateCartTotals, isCheckoutAllowed } from "../utils/cartCalculations";
import { emptyShippingForm, type ShippingFormData } from "../schemas/shipping.schema";
import { CheckoutStepper, type CheckoutStep } from "../components/checkout/CheckoutStepper";
import { CartReviewStep } from "../components/checkout/CartReviewStep";
import { ShippingStep } from "../components/checkout/ShippingStep";
import { PaymentSummaryStep } from "../components/checkout/PaymentSummaryStep";

export function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const [step, setStep] = useState<CheckoutStep>("review");
  const [shipping, setShipping] = useState<ShippingFormData>(emptyShippingForm);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totals = calculateCartTotals(items);

  // Guard against reaching checkout with an empty or under-minimum cart
  // (e.g. by typing the URL directly) - but not once the order has been placed,
  // since placing an order clears the cart on purpose.
  if (!orderPlaced && (items.length === 0 || !isCheckoutAllowed(totals.subtotal))) {
    return <Navigate to="/cart" replace />;
  }

  function handlePlaceOrder() {
    setOrderPlaced(true);
    clearCart();
  }

  if (orderPlaced) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-8">
          <p className="text-2xl">✓</p>
          <h1 className="mt-2 text-xl font-semibold text-emerald-800">Order placed!</h1>
          <p className="mt-1 text-sm text-emerald-700">
            Thanks, {shipping.fullName.split(" ")[0] || "there"} — a confirmation would normally be
            sent to {shipping.email}.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="mb-4 text-xl font-semibold text-slate-900">Checkout</h1>
      <CheckoutStepper currentStep={step} />

      {step === "review" && (
        <CartReviewStep items={items} totals={totals} onContinue={() => setStep("shipping")} />
      )}

      {step === "shipping" && (
        <ShippingStep
          initialData={shipping}
          onBack={() => setStep("review")}
          onContinue={(data) => {
            setShipping(data);
            setStep("summary");
          }}
        />
      )}

      {step === "summary" && (
        <PaymentSummaryStep
          items={items}
          totals={totals}
          shipping={shipping}
          onBack={() => setStep("shipping")}
          onPlaceOrder={handlePlaceOrder}
        />
      )}
    </div>
  );
}
