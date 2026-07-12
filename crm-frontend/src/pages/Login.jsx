import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogIn, Mail, Lock, Radio } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { extractErrorMessage } from "../api/axios";
import AuthShell from "../components/layout/AuthShell";
import Button from "../components/ui/Button";
import { Input, FormRow } from "../components/ui/Field";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await login(form);
      toast.success("Welcome back");
      navigate(location.state?.from?.pathname || "/", { replace: true });
    } catch (err) {
      toast.error(extractErrorMessage(err, "Invalid email or password"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      <div className="mb-8 flex items-center gap-2.5 lg:hidden">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
          <Radio className="h-5 w-5" strokeWidth={2.25} />
        </div>
        <span className="font-display text-lg font-bold tracking-tight text-ink">Divansh CRM</span>
      </div>

      <p className="text-xs font-semibold uppercase tracking-widest text-primary">Welcome back</p>
      <h1 className="mt-1.5 font-display text-2xl font-bold text-ink">Sign in to your workspace</h1>
      <p className="mt-1.5 text-sm text-muted">Enter your credentials to access the dashboard.</p>

      <form onSubmit={onSubmit} noValidate className="mt-8 space-y-4">
        <FormRow label="Email" htmlFor="email" required error={errors.email}>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              className="pl-9"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={errors.email}
            />
          </div>
        </FormRow>

        <FormRow label="Password" htmlFor="password" required error={errors.password}>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className="pl-9"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              error={errors.password}
            />
          </div>
        </FormRow>

        <Button type="submit" className="w-full" size="lg" icon={LogIn} loading={loading}>
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        New to Divansh CRM?{" "}
        <Link to="/register" className="font-semibold text-primary hover:text-primary-600">
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
}
