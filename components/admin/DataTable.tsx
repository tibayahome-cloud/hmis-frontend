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
    <div className={`card ${className}`}>
      <div className="card-header d-flex justify-content-between align-items-center">
        <div>
          <h4 className="mb-0">{title}</h4>
          {description && <small className="text-muted">{description}</small>}
        </div>
      </div>
      <div className="card-body">
        {loading ? (
          <div className="text-muted">Loading...</div>
        ) : items.length === 0 ? (
          <div className="text-muted">{empty ?? "No records found."}</div>
        ) : (
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
                {items.map((item, idx) => (
                  <tr key={idx}>
                    {columns.map((column) => (
                      <td key={String(column.key)}>
                        {column.render
                          ? column.render(item)
                          : (item as Record<string, unknown>)[String(column.key)] as ReactNode}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {footer && <div className="card-footer bg-transparent">{footer}</div>}
    </div>
  );
}
