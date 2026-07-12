import { useState, useRef, useEffect } from "react";
import { Menu, LogOut, ChevronDown, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Topbar({ onMenuClick, title }) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const initials = (user?.name || user?.email || "U")
    .trim()
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-border bg-surface/90 px-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-muted hover:bg-canvas lg:hidden focus-ring"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h2 className="font-display text-base font-semibold text-ink sm:text-lg">{title}</h2>
      </div>

      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2.5 rounded-lg py-1.5 pl-1.5 pr-2.5 hover:bg-canvas focus-ring"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-50 text-xs font-bold text-primary">
            {initials}
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold leading-tight text-ink">{user?.name || "Account"}</p>
            <p className="text-xs leading-tight text-muted">{user?.email}</p>
          </div>
          <ChevronDown className="h-4 w-4 text-muted" />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-52 rounded-xl border border-border bg-surface py-1.5 shadow-pop animate-[popIn_0.12s_ease-out]">
            <div className="border-b border-border px-3 py-2 sm:hidden">
              <p className="text-sm font-semibold text-ink">{user?.name}</p>
              <p className="text-xs text-muted">{user?.email}</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-muted">
              <User className="h-4 w-4" /> Signed in
            </div>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm font-medium text-accent-rose hover:bg-accent-rose/5"
            >
              <LogOut className="h-4 w-4" /> Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
