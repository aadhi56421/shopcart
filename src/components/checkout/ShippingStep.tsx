import { useState, type FormEvent } from "react";
import {
  shippingSchema,
  type ShippingFormData,
  type ShippingFormErrors,
} from "../../schemas/shipping.schema";

interface ShippingStepProps {
  initialData: ShippingFormData;
  onBack: () => void;
  onContinue: (data: ShippingFormData) => void;
}

const fields: { name: keyof ShippingFormData; label: string; type: string; span?: "full" }[] = [
  { name: "fullName", label: "Full name", type: "text", span: "full" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone number", type: "tel" },
  { name: "address", label: "Address", type: "text", span: "full" },
  { name: "city", label: "City", type: "text" },
  { name: "postalCode", label: "Postal code", type: "text" },
];

export function ShippingStep({ initialData, onBack, onContinue }: ShippingStepProps) {
  const [formData, setFormData] = useState<ShippingFormData>(initialData);
  const [errors, setErrors] = useState<ShippingFormErrors>({});

  function handleChange(field: keyof ShippingFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear the field's error as soon as the user starts fixing it.
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const result = shippingSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: ShippingFormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ShippingFormData;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    onContinue(result.data);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto grid max-w-2xl grid-cols-1 gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2"
      noValidate
    >
      {fields.map((field) => (
        <div key={field.name} className={field.span === "full" ? "sm:col-span-2" : undefined}>
          <label htmlFor={field.name} className="mb-1 block text-sm font-medium text-slate-700">
            {field.label}
          </label>
          <input
            id={field.name}
            type={field.type}
            value={formData[field.name]}
            onChange={(e) => handleChange(field.name, e.target.value)}
            aria-invalid={Boolean(errors[field.name])}
            aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
            className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none ${
              errors[field.name]
                ? "border-red-400 focus:border-red-500"
                : "border-slate-300 focus:border-slate-500"
            }`}
          />
          {errors[field.name] && (
            <p id={`${field.name}-error`} className="mt-1 text-xs text-red-600">
              {errors[field.name]}
            </p>
          )}
        </div>
      ))}

      <div className="flex justify-between gap-3 sm:col-span-2">
        <button
          type="button"
          onClick={onBack}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          Back
        </button>
        <button
          type="submit"
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          Continue to Payment Summary
        </button>
      </div>
    </form>
  );
}
