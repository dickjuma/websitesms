type Step = {
  title: string;
  description: string;
  stepNumber?: string;
};

type ServiceStepsProps = {
  steps: Step[];
};

export function ServiceSteps({ steps }: ServiceStepsProps) {
  return (
    <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {steps.map((step, index) => (
        <li key={step.stepNumber ?? step.title} className="relative">
          {/* Optional connecting line (if not last) */}
          {index < steps.length - 1 && (
            <div
              className="absolute left-8 top-16 hidden h-0.5 w-[calc(100%-2rem)] bg-stone-300 md:block"
              aria-hidden="true"
            />
          )}
          <div className="relative">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-2xl font-bold text-stone-800">
              {step.stepNumber ?? String(index + 1).padStart(2, "0")}
            </div>
            <h3 className="text-xl font-semibold text-stone-950">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              {step.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
