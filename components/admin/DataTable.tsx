import type { ReactNode } from "react";

type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (item: T) => ReactNode;
};

type DataTableProps<T> = {
  title: string;
  description?: string;
  columns: Column<T>[];
  items: T[];
  loading?: boolean;
  empty?: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export default function DataTable<T>({
  title,
  description,
  columns,
  items,
  loading = false,
  empty,
  footer,
  className = "",
}: DataTableProps<T>) {
  return (
    <div className={className}>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={String(column.key)}>{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-4 text-muted" style={{ color: "var(--muted)" }}>
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <span>Loading records...</span>
                    </div>
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-5 text-muted" style={{ color: "var(--muted)" }}>
                    {empty ?? "No records found."}
                  </td>
                </tr>
              ) : (
                items.map((item, idx) => (
                  <tr key={idx}>
                    {columns.map((column) => (
                      <td key={String(column.key)}>
                        {column.render
                          ? column.render(item)
                          : (item as Record<string, unknown>)[String(column.key)] as ReactNode}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {footer && <div className="card-footer bg-transparent border-top-0 pt-0 pb-4 px-4">{footer}</div>}
    </div>
  );
}
