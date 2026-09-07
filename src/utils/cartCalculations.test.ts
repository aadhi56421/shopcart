import { describe, expect, it } from "vitest";
import { calculateCartTotals, isCheckoutAllowed } from "./cartCalculations";
import type { CartItem } from "../store/cartStore";

function makeItem(overrides: Partial<CartItem> = {}): CartItem {
  return {
    id: 1,
    title: "Test product",
    price: 10,
    thumbnail: "",
    category: "test",
    quantity: 1,
    ...overrides,
  };
}

describe("calculateCartTotals", () => {
  it("returns zeroed totals for an empty cart", () => {
    expect(calculateCartTotals([])).toEqual({ subtotal: 0, tax: 0, discount: 0, total: 0 });
  });

  it("multiplies price by quantity across items for the subtotal", () => {
    const items = [makeItem({ id: 1, price: 10, quantity: 2 }), makeItem({ id: 2, price: 5, quantity: 3 })];
    const totals = calculateCartTotals(items);
    expect(totals.subtotal).toBe(35);
  });

  it("applies 5% tax on the subtotal", () => {
    const totals = calculateCartTotals([makeItem({ price: 50, quantity: 1 })]);
    expect(totals.tax).toBeCloseTo(2.5);
  });

  it("does not apply a discount when subtotal is $100 or less", () => {
    const totals = calculateCartTotals([makeItem({ price: 100, quantity: 1 })]);
    expect(totals.discount).toBe(0);
  });

  it("applies a 10% discount once subtotal exceeds $100", () => {
    const totals = calculateCartTotals([makeItem({ price: 150, quantity: 1 })]);
    expect(totals.discount).toBeCloseTo(15);
    // total = subtotal + tax - discount = 150 + 7.5 - 15
    expect(totals.total).toBeCloseTo(142.5);
  });
});

describe("isCheckoutAllowed", () => {
  it("is false below the $10 minimum", () => {
    expect(isCheckoutAllowed(9.99)).toBe(false);
  });

  it("is true at or above the $10 minimum", () => {
    expect(isCheckoutAllowed(10)).toBe(true);
    expect(isCheckoutAllowed(10.01)).toBe(true);
  });
});
