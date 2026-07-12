import { useEffect, useState } from "react";
import { CheckSquare, CalendarDays } from "lucide-react";
import toast from "react-hot-toast";
import { PageHeader, EmptyState, Spinner } from "../../components/ui/Misc";
import Toolbar from "../../components/ui/Toolbar";
import DataTable from "../../components/ui/DataTable";
import Pagination from "../../components/ui/Pagination";
import StatusPill from "../../components/ui/StatusPill";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import useDebounce from "../../hooks/useDebounce";
import * as tasksApi from "../../api/tasks";
import { extractErrorMessage } from "../../api/axios";
import TaskFormModal from "./TaskFormModal";

const PAGE_SIZE = 8;

function formatDate(d) {
  if (!d) return "—";
  try {
    return new Date(d).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return d;
  }
}

export default function Tasks() {
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
    tasksApi
      .searchTasks({ title: debouncedSearch, page, size: PAGE_SIZE, sortBy: "title" })
      .then(setPageData)
      .catch((err) => toast.error(extractErrorMessage(err, "Could not load tasks")))
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
      await tasksApi.deleteTask(toDelete.id);
      toast.success("Task deleted");
      setToDelete(null);
      load();
    } catch (err) {
      toast.error(extractErrorMessage(err, "Could not delete task"));
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    {
      key: "title",
      header: "Task",
      render: (row) => (
        <div className="max-w-xs">
          <p className="font-semibold text-ink">{row.title}</p>
          {row.description && <p className="truncate text-xs text-muted">{row.description}</p>}
        </div>
      ),
    },
    { key: "assignedEmployee", header: "Assigned to", render: (row) => row.assignedEmployee || "—" },
    {
      key: "dueDate",
      header: "Due date",
      render: (row) => (
        <span className="inline-flex items-center gap-1.5 text-ink">
          <CalendarDays className="h-3.5 w-3.5 text-muted" />
          {formatDate(row.dueDate)}
        </span>
      ),
    },
    { key: "priority", header: "Priority", render: (row) => <StatusPill value={row.priority} /> },
    { key: "status", header: "Status", render: (row) => <StatusPill value={row.status} /> },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Execution"
        title="Tasks"
        description="Work items assigned across your team."
      />

      <div className="rounded-xl2 border border-border bg-surface shadow-card">
        <Toolbar
          searchValue={search}
          onSearchChange={setSearch}
          placeholder="Search by title…"
          onAdd={() => {
            setEditing(null);
            setFormOpen(true);
          }}
          addLabel="Add task"
        />

        {loading ? (
          <div className="flex justify-center py-16">
            <Spinner />
          </div>
        ) : pageData.content?.length === 0 ? (
          <EmptyState
            icon={CheckSquare}
            title="No tasks found"
            description={
              debouncedSearch ? "Try a different search term." : "Add your first task to get organized."
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

      <TaskFormModal open={formOpen} onClose={() => setFormOpen(false)} onSaved={load} task={editing} />

      <ConfirmDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete this task?"
        description={toDelete ? `"${toDelete.title}" will be permanently removed.` : ""}
      />
    </div>
  );
}
