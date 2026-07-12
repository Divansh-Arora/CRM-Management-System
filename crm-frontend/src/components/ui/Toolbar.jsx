import { Search, Plus } from "lucide-react";
import Button from "./Button";

export default function Toolbar({ searchValue, onSearchChange, placeholder, onAdd, addLabel }) {
  return (
    <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-xs">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="h-10 w-full rounded-lg border border-border bg-white pl-9 pr-3 text-sm placeholder:text-muted/70 focus-ring focus-visible:border-primary"
        />
      </div>
      {onAdd && (
        <Button icon={Plus} onClick={onAdd} className="shrink-0">
          {addLabel}
        </Button>
      )}
    </div>
  );
}
