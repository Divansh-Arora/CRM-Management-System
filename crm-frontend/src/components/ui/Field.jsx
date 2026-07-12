import clsx from "clsx";

const baseControl =
  "w-full h-10 rounded-lg border border-border bg-white px-3 text-sm text-ink placeholder:text-muted/70 focus-ring focus-visible:border-primary transition-colors disabled:bg-canvas disabled:text-muted";

export function Label({ children, htmlFor, required }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
      {children} {required && <span className="text-accent-rose">*</span>}
    </label>
  );
}

export function Input({ className, error, ...props }) {
  return (
    <input
      className={clsx(baseControl, error && "border-accent-rose focus-visible:ring-accent-rose/40", className)}
      {...props}
    />
  );
}

export function Textarea({ className, error, ...props }) {
  return (
    <textarea
      className={clsx(baseControl, "h-24 py-2 resize-none", error && "border-accent-rose", className)}
      {...props}
    />
  );
}

export function Select({ className, error, children, ...props }) {
  return (
    <select
      className={clsx(baseControl, "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%236B7280%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-no-repeat bg-[right_0.65rem_center] bg-[length:16px] pr-9", error && "border-accent-rose", className)}
      {...props}
    >
      {children}
    </select>
  );
}

export function FieldError({ children }) {
  if (!children) return null;
  return <p className="mt-1 text-xs font-medium text-accent-rose">{children}</p>;
}

export function FormRow({ label, htmlFor, required, error, children }) {
  return (
    <div>
      <Label htmlFor={htmlFor} required={required}>
        {label}
      </Label>
      {children}
      <FieldError>{error}</FieldError>
    </div>
  );
}
