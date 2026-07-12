import clsx from "clsx";

const TONE_MAP = {
  // positive / active
  active: "teal",
  converted: "teal",
  completed: "teal",
  done: "teal",
  qualified: "teal",
  won: "teal",
  hired: "teal",
  // in-progress / neutral-warm
  new: "violet",
  contacted: "violet",
  pending: "amber",
  progress: "amber",
  in_progress: "amber",
  "in-progress": "amber",
  medium: "amber",
  high: "rose",
  urgent: "rose",
  lost: "rose",
  inactive: "rose",
  cancelled: "rose",
  canceled: "rose",
  low: "slate",
  lead: "slate",
};

const TONE_STYLES = {
  teal: "bg-accent-teal/10 text-accent-teal ring-accent-teal/20",
  amber: "bg-accent-amber/10 text-amber-700 ring-accent-amber/30",
  rose: "bg-accent-rose/10 text-accent-rose ring-accent-rose/20",
  violet: "bg-accent-violet/10 text-accent-violet ring-accent-violet/20",
  slate: "bg-ink/5 text-muted ring-ink/10",
};

export default function StatusPill({ value }) {
  if (!value) return <span className="text-sm text-muted">—</span>;
  const key = String(value).toLowerCase().replace(/\s+/g, "_");
  const tone = TONE_MAP[key] || "slate";
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1",
        TONE_STYLES[tone]
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {String(value).toLowerCase().replace(/_/g, " ")}
    </span>
  );
}
