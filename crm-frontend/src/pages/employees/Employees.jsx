import { useEffect, useState } from "react";
import { UserSquare2 } from "lucide-react";
import toast from "react-hot-toast";
import { PageHeader, EmptyState, Spinner } from "../../components/ui/Misc";
import Toolbar from "../../components/ui/Toolbar";
import DataTable from "../../components/ui/DataTable";
import Pagination from "../../components/ui/Pagination";
import StatusPill from "../../components/ui/StatusPill";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import useDebounce from "../../hooks/useDebounce";
import * as employeesApi from "../../api/employees";
import { extractErrorMessage } from "../../api/axios";
import EmployeeFormModal from "./EmployeeFormModal";

const PAGE_SIZE = 8;

const currency = new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function Employees() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ content: [], totalPages: 0, totalElements: 0 });
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = () => {
    setLoading(true);
    employeesApi
      .searchEmployees({ name: debouncedSearch, page, size: PAGE_SIZE, sortBy: "name" })
      .then(setPageData)
      .catch((err) => toast.error(extractErrorMessage(err, "Could not load team members")))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, page]);

  useEffect(() => {
    setPage(0);
  }, [debouncedSearch]);

  const handleDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await employeesApi.deleteEmployee(toDelete.id);
      toast.success("Team member deleted");
      setToDelete(null);
      load();
    } catch (err) {
      toast.error(extractErrorMessage(err, "Could not delete team member"));
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    {
      key: "name",
      header: "Name",
      render: (row) => (
        <div>
          <p className="font-semibold text-ink">{row.name}</p>
          <p className="text-xs text-muted">{row.email}</p>
        </div>
      ),
    },
    { key: "department", header: "Department", render: (row) => row.department || "—" },
    { key: "designation", header: "Designation", render: (row) => row.designation || "—" },
    {
      key: "salary",
      header: "Salary",
      render: (row) => (
        <span className="font-mono text-sm">{row.salary != null ? currency.format(row.salary) : "—"}</span>
      ),
    },
    { key: "status", header: "Status", render: (row) => <StatusPill value={row.status} /> },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="People"
        title="Team"
        description="Everyone on your team, their roles and workload."
      />

      <div className="rounded-xl2 border border-border bg-surface shadow-card">
        <Toolbar
          searchValue={search}
          onSearchChange={setSearch}
          placeholder="Search by name…"
          onAdd={() => {
            setEditing(null);
            setFormOpen(true);
          }}
          addLabel="Add team member"
        />

        {loading ? (
          <div className="flex justify-center py-16">
            <Spinner />
          </div>
        ) : pageData.content?.length === 0 ? (
          <EmptyState
            icon={UserSquare2}
            title="No team members found"
            description={
              debouncedSearch ? "Try a different search term." : "Add your first team member to assign work."
            }
          />
        ) : (
          <>
            <DataTable
              columns={columns}
              rows={pageData.content}
              onEdit={(row) => {
                setEditing(row);
                setFormOpen(true);
              }}
              onDelete={(row) => setToDelete(row)}
            />
            <Pagination
              page={pageData.number ?? page}
              totalPages={pageData.totalPages}
              totalElements={pageData.totalElements}
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
            />
          </>
        )}
      </div>

      <EmployeeFormModal open={formOpen} onClose={() => setFormOpen(false)} onSaved={load} employee={editing} />

      <ConfirmDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete this team member?"
        description={toDelete ? `${toDelete.name} will be permanently removed.` : ""}
      />
    </div>
  );
}
