import { Pencil, Trash2 } from "lucide-react";

export default function DataTable({ columns, rows, keyField = "id", onEdit, onDelete, emptyMessage }) {
  if (!rows || rows.length === 0) {
    return (
      <div className="px-6 py-16 text-center text-sm text-muted">
        {emptyMessage || "No records found."}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-canvas/60">
            {columns.map((col) => (
              <th
                key={col.key}
                className="whitespace-nowrap px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted"
              >
                {col.header}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-muted">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row[keyField]}
              className="border-b border-border last:border-0 hover:bg-canvas/50 transition-colors"
            >
              {columns.map((col) => (
                <td key={col.key} className="whitespace-nowrap px-5 py-3.5 text-ink">
                  {col.render ? col.render(row) : row[col.key] ?? "—"}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-1">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        className="rounded-lg p-2 text-muted hover:bg-primary-50 hover:text-primary focus-ring"
                        aria-label="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row)}
                        className="rounded-lg p-2 text-muted hover:bg-accent-rose/10 hover:text-accent-rose focus-ring"
                        aria-label="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
