import { NavLink } from "react-router-dom";
import clsx from "clsx";
import {
  LayoutGrid,
  Users,
  Target,
  CheckSquare,
  UserSquare2,
  Radio,
} from "lucide-react";

const NAV_ITEMS = [
  { to: "/", label: "Overview", icon: LayoutGrid, end: true },
  { to: "/customers", label: "Customers", icon: Users },
  { to: "/leads", label: "Leads", icon: Target },
  { to: "/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/employees", label: "Team", icon: UserSquare2 },
];

export default function Sidebar({ open, onNavigate }) {
  return (
    <aside
      className={clsx(
        "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-ink text-white transition-transform duration-200 lg:static lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-16 shrink-0 items-center gap-2.5 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
          <Radio className="h-4.5 w-4.5" strokeWidth={2.25} />
        </div>
        <div className="leading-tight">
          <p className="font-display text-[15px] font-bold tracking-tight">Divansh CRM</p>
        </div>
      </div>

      <nav className="mt-4 flex-1 space-y-1 px-3">
        <p className="px-3 pb-2 pt-3 text-[10px] font-bold uppercase tracking-widest text-white/35">
          Workspace
        </p>
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              clsx(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={clsx(
                    "h-5 w-0.5 rounded-full transition-colors",
                    isActive ? "bg-primary-400" : "bg-transparent"
                  )}
                />
                <Icon className="h-4.5 w-4.5 -ml-1" strokeWidth={2} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="m-3 rounded-xl bg-white/5 p-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">Status</p>
        <div className="mt-2 flex items-center gap-2 text-xs text-white/70">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-teal opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-teal" />
          </span>
          API connected
        </div>
      </div>
    </aside>
  );
}
