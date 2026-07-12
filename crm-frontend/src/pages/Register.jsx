import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Mail, Lock, User, Radio } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { extractErrorMessage } from "../api/axios";
import AuthShell from "../components/layout/AuthShell";
import Button from "../components/ui/Button";
import { Input, FormRow } from "../components/ui/Field";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Use at least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await register(form);
      toast.success("Account created");
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(extractErrorMessage(err, "Could not create account"));
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

      <p className="text-xs font-semibold uppercase tracking-widest text-primary">Get started</p>
      <h1 className="mt-1.5 font-display text-2xl font-bold text-ink">Create your account</h1>
      <p className="mt-1.5 text-sm text-muted">Set up your workspace in under a minute.</p>

      <form onSubmit={onSubmit} noValidate className="mt-8 space-y-4">
        <FormRow label="Full name" htmlFor="name" required error={errors.name}>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <Input
              id="name"
              placeholder="Jordan Blake"
              className="pl-9"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              error={errors.name}
            />
          </div>
        </FormRow>

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
              autoComplete="new-password"
              placeholder="At least 6 characters"
              className="pl-9"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              error={errors.password}
            />
          </div>
        </FormRow>

        <Button type="submit" className="w-full" size="lg" icon={UserPlus} loading={loading}>
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-primary hover:text-primary-600">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
