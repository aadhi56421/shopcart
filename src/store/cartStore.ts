import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../schemas/product.schema";

export const MIN_QUANTITY = 1;
export const MAX_QUANTITY = 5;

export interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
}

/**
 * Global cart state, managed with Zustand and persisted to localStorage via
 * the `persist` middleware. Only cart items live here - product catalogue
 * data stays in TanStack Query's cache, per the assignment's separation of
 * concerns (server state vs. client/UI state).
 */
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === product.id);

          if (existing) {
            if (existing.quantity >= MAX_QUANTITY) return state;
            return {
              items: state.items.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                id: product.id,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,
                category: product.category,
                quantity: 1,
              },
            ],
          };
        }),

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((item) => item.id !== id) })),

      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.quantity < MAX_QUANTITY
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.quantity > MIN_QUANTITY
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          ),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "shopping-cart-storage",
    },
  ),
);
