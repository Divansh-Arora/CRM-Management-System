import { Radio, TrendingUp, Users, CheckCircle2 } from "lucide-react";

const STATS = [
  { icon: Users, label: "Customers tracked", value: "2,480+" },
  { icon: TrendingUp, label: "Leads converted", value: "38%" },
  { icon: CheckCircle2, label: "Tasks closed weekly", value: "612" },
];

export default function AuthShell({ children }) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-ink p-12 text-white lg:flex">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/30 blur-3xl"
          aria-hidden
        />

        <div className="relative flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
            <Radio className="h-5 w-5" strokeWidth={2.25} />
          </div>
          <span className="font-display text-lg font-bold tracking-tight">Divansh CRM</span>
        </div>

        <div className="relative max-w-md">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary-400">
            Pipeline / 01
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.15] tracking-tight">
            Every lead, task and teammate in one operating view.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Track customers from first contact to closed deal, assign work across your
            team, and see the numbers move in real time.
          </p>
        </div>

        <div className="relative grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
          {STATS.map(({ icon: Icon, label, value }) => (
            <div key={label}>
              <Icon className="h-4 w-4 text-primary-400" strokeWidth={2} />
              <p className="mt-2 font-mono text-xl font-semibold">{value}</p>
              <p className="mt-0.5 text-xs text-white/50">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center bg-canvas px-6 py-12">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
