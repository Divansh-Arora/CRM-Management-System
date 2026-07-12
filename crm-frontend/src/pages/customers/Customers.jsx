import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import toast from "react-hot-toast";
import { PageHeader, EmptyState, Spinner } from "../../components/ui/Misc";
import Toolbar from "../../components/ui/Toolbar";
import DataTable from "../../components/ui/DataTable";
import Pagination from "../../components/ui/Pagination";
import StatusPill from "../../components/ui/StatusPill";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import useDebounce from "../../hooks/useDebounce";
import * as customersApi from "../../api/customers";
import { extractErrorMessage } from "../../api/axios";
import CustomerFormModal from "./CustomerFormModal";

const PAGE_SIZE = 8;

export default function Customers() {
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
    customersApi
      .searchCustomers({ name: debouncedSearch, page, size: PAGE_SIZE, sortBy: "firstName" })
      .then(setPageData)
      .catch((err) => toast.error(extractErrorMessage(err, "Could not load customers")))
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
      await customersApi.deleteCustomer(toDelete.id);
      toast.success("Customer deleted");
      setToDelete(null);
      load();
    } catch (err) {
      toast.error(extractErrorMessage(err, "Could not delete customer"));
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
          <p className="font-semibold text-ink">
            {row.firstName} {row.lastName}
          </p>
          <p className="text-xs text-muted">{row.email}</p>
        </div>
      ),
    },
    { key: "phone", header: "Phone" },
    { key: "company", header: "Company", render: (row) => row.company || "—" },
    { key: "city", header: "City", render: (row) => row.city || "—" },
    { key: "status", header: "Status", render: (row) => <StatusPill value={row.status} /> },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Accounts"
        title="Customers"
        description="Everyone your team has closed or is actively serving."
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
          addLabel="Add customer"
        />

        {loading ? (
          <div className="flex justify-center py-16">
            <Spinner />
          </div>
        ) : pageData.content?.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No customers found"
            description={
              debouncedSearch
                ? "Try a different search term."
                : "Add your first customer to start tracking accounts."
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

      <CustomerFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSaved={load}
        customer={editing}
      />

      <ConfirmDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete this customer?"
        description={
          toDelete ? `${toDelete.firstName} ${toDelete.lastName} will be permanently removed.` : ""
        }
      />
    </div>
  );
}
