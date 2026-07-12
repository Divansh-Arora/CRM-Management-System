import { useEffect, useState } from "react";
import { Target, ArrowRightCircle } from "lucide-react";
import toast from "react-hot-toast";
import { PageHeader, EmptyState, Spinner } from "../../components/ui/Misc";
import Toolbar from "../../components/ui/Toolbar";
import DataTable from "../../components/ui/DataTable";
import Pagination from "../../components/ui/Pagination";
import StatusPill from "../../components/ui/StatusPill";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import useDebounce from "../../hooks/useDebounce";
import * as leadsApi from "../../api/leads";
import { extractErrorMessage } from "../../api/axios";
import LeadFormModal from "./LeadFormModal";

const PAGE_SIZE = 8;

export default function Leads() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ content: [], totalPages: 0, totalElements: 0 });
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toConvert, setToConvert] = useState(null);
  const [converting, setConverting] = useState(false);

  const load = () => {
    setLoading(true);
    leadsApi
      .searchLeads({ customerName: debouncedSearch, page, size: PAGE_SIZE, sortBy: "customerName" })
      .then(setPageData)
      .catch((err) => toast.error(extractErrorMessage(err, "Could not load leads")))
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
      await leadsApi.deleteLead(toDelete.id);
      toast.success("Lead deleted");
      setToDelete(null);
      load();
    } catch (err) {
      toast.error(extractErrorMessage(err, "Could not delete lead"));
    } finally {
      setDeleting(false);
    }
  };

  const handleConvert = async () => {
    if (!toConvert) return;
    setConverting(true);
    try {
      await leadsApi.convertLead(toConvert.id);
      toast.success(`${toConvert.customerName} converted to a customer`);
      setToConvert(null);
      load();
    } catch (err) {
      toast.error(extractErrorMessage(err, "Could not convert lead"));
    } finally {
      setConverting(false);
    }
  };

  const columns = [
    {
      key: "customerName",
      header: "Lead",
      render: (row) => (
        <div>
          <p className="font-semibold text-ink">{row.customerName}</p>
          <p className="text-xs text-muted">{row.email}</p>
        </div>
      ),
    },
    { key: "phone", header: "Phone" },
    { key: "company", header: "Company", render: (row) => row.company || "—" },
    { key: "source", header: "Source", render: (row) => row.source || "—" },
    { key: "assignedTo", header: "Assigned to", render: (row) => row.assignedTo || "—" },
    { key: "status", header: "Status", render: (row) => <StatusPill value={row.status} /> },
    {
      key: "convert",
      header: "",
      render: (row) => (
        <button
          onClick={() => setToConvert(row)}
          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-primary hover:bg-primary-50 focus-ring"
        >
          <ArrowRightCircle className="h-3.5 w-3.5" />
          Convert
        </button>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Pipeline"
        title="Leads"
        description="Prospects your team is working to close."
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
          addLabel="Add lead"
        />

        {loading ? (
          <div className="flex justify-center py-16">
            <Spinner />
          </div>
        ) : pageData.content?.length === 0 ? (
          <EmptyState
            icon={Target}
            title="No leads found"
            description={
              debouncedSearch ? "Try a different search term." : "Add your first lead to start the pipeline."
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

      <LeadFormModal open={formOpen} onClose={() => setFormOpen(false)} onSaved={load} lead={editing} />

      <ConfirmDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete this lead?"
        description={toDelete ? `${toDelete.customerName} will be permanently removed.` : ""}
      />

      <ConfirmDialog
        open={!!toConvert}
        onClose={() => setToConvert(null)}
        onConfirm={handleConvert}
        loading={converting}
        tone="warning"
        confirmLabel="Convert"
        title="Convert this lead to a customer?"
        description={
          toConvert ? `${toConvert.customerName} will be added to your customers list.` : ""
        }
      />
    </div>
  );
}
