import clsx from "clsx";
import { Loader2 } from "lucide-react";

const variants = {
  primary:
    "bg-primary text-white hover:bg-primary-600 active:bg-primary-700 shadow-sm",
  secondary:
    "bg-white text-ink border border-border hover:bg-canvas active:bg-border/40",
  ghost: "bg-transparent text-ink hover:bg-ink/5",
  danger: "bg-white text-accent-rose border border-accent-rose/30 hover:bg-accent-rose/5",
  dangerSolid: "bg-accent-rose text-white hover:bg-red-600 shadow-sm",
};

const sizes = {
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-11 px-5 text-[15px] gap-2",
};

export default function Button({
  as: Component = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className,
  children,
  icon: Icon,
  ...props
}) {
  return (
    <Component
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-ring disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        Icon && <Icon className="h-4 w-4" strokeWidth={2.25} />
      )}
      {children}
    </Component>
  );
}
