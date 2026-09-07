import { z } from "zod";

/**
 * Validation rules for the shipping step of checkout.
 * Kept separate from the form component so the same rules can be reused
 * (e.g. for a single-field check on blur) without re-reading JSX.
 */
export const shippingSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required"),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
  phone: z.string().trim().min(1, "Phone number is required"),
  address: z.string().trim().min(1, "Address is required"),
  city: z.string().trim().min(1, "City is required"),
  postalCode: z.string().trim().min(1, "Postal code is required"),
});

export type ShippingFormData = z.infer<typeof shippingSchema>;

export type ShippingFormErrors = Partial<Record<keyof ShippingFormData, string>>;

export const emptyShippingForm: ShippingFormData = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
};
