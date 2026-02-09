import type { HTMLAttributes, ReactNode } from "react";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function Card({ title, description, actions, children, className, ...props }: CardProps) {
  return (
    <section
      className={[
        "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm",
        className
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <header className="space-y-1">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        {description ? <p className="text-sm text-slate-500">{description}</p> : null}
      </header>
      {children ? <div className="mt-4">{children}</div> : null}
      {actions ? <div className="mt-6 flex items-center gap-3">{actions}</div> : null}
    </section>
  );
}
