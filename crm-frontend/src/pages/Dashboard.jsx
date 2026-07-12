import { useEffect, useState } from "react";
import {
  Users,
  UserCheck,
  Target,
  CheckCircle2,
  Briefcase,
  ListChecks,
  Clock3,
  TrendingUp,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import toast from "react-hot-toast";
import * as dashboardApi from "../api/dashboard";
import { extractErrorMessage } from "../api/axios";
import { PageHeader, FullPageSpinner } from "../components/ui/Misc";

function StatCard({ icon: Icon, label, value, tone = "primary", suffix }) {
  const toneStyles = {
    primary: "bg-primary-50 text-primary",
    teal: "bg-accent-teal/10 text-accent-teal",
    amber: "bg-accent-amber/10 text-amber-700",
    violet: "bg-accent-violet/10 text-accent-violet",
  };
  return (
    <div className="rounded-xl2 border border-border bg-surface p-5 shadow-card">
      <div className="flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${toneStyles[tone]}`}>
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>
      </div>
      <p className="mt-4 font-mono text-3xl font-semibold tabular-nums text-ink">
        {value}
        {suffix && <span className="ml-1 text-base font-medium text-muted">{suffix}</span>}
      </p>
      <p className="mt-1 text-sm font-medium text-muted">{label}</p>
    </div>
  );
}

const PIE_COLORS = ["#2451D9", "#0FB88A", "#F2A93B", "#E5484D"];

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    dashboardApi
      .getDashboard()
      .then((res) => active && setData(res))
      .catch((err) => toast.error(extractErrorMessage(err, "Could not load dashboard")))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  if (loading) return <FullPageSpinner />;
  if (!data) return null;

  const leadConversionRate = data.totalLeads
    ? Math.round((data.convertedLeads / data.totalLeads) * 100)
    : 0;

  const taskChart = [
    { name: "Completed", value: data.completedTasks },
    { name: "Pending", value: data.pendingTasks },
    {
      name: "Other",
      value: Math.max(data.totalTasks - data.completedTasks - data.pendingTasks, 0),
    },
  ].filter((d) => d.value > 0);

  const funnelChart = [
    { name: "Leads", value: data.totalLeads },
    { name: "Converted", value: data.convertedLeads },
    { name: "Customers", value: data.totalCustomers },
    { name: "Active", value: data.activeCustomers },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Live snapshot"
        title="Overview"
        description="A pulse on customers, leads, tasks and your team."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Users} label="Total customers" value={data.totalCustomers} tone="primary" />
        <StatCard icon={UserCheck} label="Active customers" value={data.activeCustomers} tone="teal" />
        <StatCard icon={Target} label="Total leads" value={data.totalLeads} tone="violet" />
        <StatCard
          icon={TrendingUp}
          label="Lead conversion rate"
          value={leadConversionRate}
          suffix="%"
          tone="amber"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={CheckCircle2} label="Converted leads" value={data.convertedLeads} tone="teal" />
        <StatCard icon={ListChecks} label="Total tasks" value={data.totalTasks} tone="primary" />
        <StatCard icon={Clock3} label="Pending tasks" value={data.pendingTasks} tone="amber" />
        <StatCard icon={Briefcase} label="Team members" value={data.totalEmployees} tone="violet" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-5">
        <div className="rounded-xl2 border border-border bg-surface p-5 shadow-card xl:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display text-base font-semibold text-ink">Pipeline funnel</h3>
              <p className="text-sm text-muted">From raw leads to active customers</p>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelChart} margin={{ left: -10 }}>
                <CartesianGrid vertical={false} stroke="#E4E6EC" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  axisLine={{ stroke: "#E4E6EC" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  cursor={{ fill: "#F4F5F8" }}
                  contentStyle={{
                    borderRadius: 10,
                    border: "1px solid #E4E6EC",
                    fontSize: 13,
                  }}
                />
                <Bar dataKey="value" fill="#2451D9" radius={[6, 6, 0, 0]} maxBarSize={56} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl2 border border-border bg-surface p-5 shadow-card xl:col-span-2">
          <div className="mb-4">
            <h3 className="font-display text-base font-semibold text-ink">Task status</h3>
            <p className="text-sm text-muted">{data.totalTasks} tasks tracked</p>
          </div>
          {taskChart.length === 0 ? (
            <div className="flex h-72 items-center justify-center text-sm text-muted">
              No tasks yet
            </div>
          ) : (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskChart}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={62}
                    outerRadius={92}
                    paddingAngle={3}
                    strokeWidth={0}
                  >
                    {taskChart.map((entry, i) => (
                      <Cell key={entry.name} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: 10,
                      border: "1px solid #E4E6EC",
                      fontSize: 13,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1.5">
                {taskChart.map((entry, i) => (
                  <div key={entry.name} className="flex items-center gap-1.5 text-xs text-muted">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
                    />
                    {entry.name} ({entry.value})
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
