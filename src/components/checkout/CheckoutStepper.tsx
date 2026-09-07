export type CheckoutStep = "review" | "shipping" | "summary";

const steps: { key: CheckoutStep; label: string }[] = [
  { key: "review", label: "Cart Review" },
  { key: "shipping", label: "Shipping" },
  { key: "summary", label: "Payment Summary" },
];

interface CheckoutStepperProps {
  currentStep: CheckoutStep;
}

export function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  const currentIndex = steps.findIndex((step) => step.key === currentStep);

  return (
    <ol className="mb-6 flex items-center gap-2 text-sm">
      {steps.map((step, index) => {
        const isDone = index < currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <li key={step.key} className="flex flex-1 items-center gap-2">
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                isCurrent
                  ? "bg-slate-900 text-white"
                  : isDone
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-200 text-slate-500"
              }`}
            >
              {isDone ? "✓" : index + 1}
            </span>
            <span className={isCurrent ? "font-medium text-slate-900" : "text-slate-500"}>
              {step.label}
            </span>
            {index < steps.length - 1 && <span className="h-px flex-1 bg-slate-200" />}
          </li>
        );
      })}
    </ol>
  );
}
