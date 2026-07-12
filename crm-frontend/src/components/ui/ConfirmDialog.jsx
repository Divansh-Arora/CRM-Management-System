import { AlertTriangle } from "lucide-react";
import Modal from "./Modal";
import Button from "./Button";

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description,
  confirmLabel = "Delete",
  loading = false,
  tone = "danger",
}) {
  return (
    <Modal open={open} onClose={onClose} title="" width="max-w-sm">
      <div className="flex flex-col items-center text-center">
        <div
          className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${
            tone === "danger" ? "bg-accent-rose/10 text-accent-rose" : "bg-accent-amber/10 text-accent-amber"
          }`}
        >
          <AlertTriangle className="h-6 w-6" />
        </div>
        <h3 className="font-display text-base font-semibold text-ink">{title}</h3>
        {description && <p className="mt-1.5 text-sm text-muted">{description}</p>}
        <div className="mt-6 flex w-full gap-3">
          <Button variant="secondary" className="flex-1" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant={tone === "danger" ? "dangerSolid" : "primary"}
            className="flex-1"
            onClick={onConfirm}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
