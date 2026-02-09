import type { ButtonHTMLAttributes } from "react";

const baseClass =
  "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

const variants: Record<string, string> = {
  primary: "bg-emerald-600 hover:bg-emerald-700 focus-visible:outline-emerald-600",
  secondary: "bg-slate-900 hover:bg-slate-800 focus-visible:outline-slate-900",
  ghost: "bg-transparent text-slate-900 hover:bg-slate-100 focus-visible:outline-slate-300"
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  const variantClass = variants[variant] ?? variants.primary;
  return (
    <button
      type={type}
      className={[baseClass, variantClass, className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
