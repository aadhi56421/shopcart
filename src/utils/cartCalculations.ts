import type { CartItem } from "../store/cartStore";

export const TAX_RATE = 0.05;
export const DISCOUNT_THRESHOLD = 100;
export const DISCOUNT_RATE = 0.1;
export const MIN_CHECKOUT_VALUE = 10;

export interface CartTotals {
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
}

/**
 * Pure function for all cart math, kept outside the store/components so it
 * can be unit tested and reasoned about in isolation.
 *
 * Rules (from the assignment):
 * - Tax is 5% of the subtotal.
 * - A 10% discount applies once the subtotal is over $100.
 * - Minimum checkout value is $10 (enforced separately via isCheckoutAllowed).
 */
export function calculateCartTotals(items: CartItem[]): CartTotals {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const discount = subtotal > DISCOUNT_THRESHOLD ? subtotal * DISCOUNT_RATE : 0;
  const total = subtotal + tax - discount;

  return { subtotal, tax, discount, total };
}

export function isCheckoutAllowed(subtotal: number): boolean {
  return subtotal >= MIN_CHECKOUT_VALUE;
}

export function formatCurrency(value: number): string {
  return `$${value.toFixed(2)}`;
}
