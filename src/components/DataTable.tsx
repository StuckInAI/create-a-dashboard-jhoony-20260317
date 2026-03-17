'use client';

import { useState } from 'react';

interface Column {
  key: string;
  label: string;
}

interface DataTableProps {
  columns: Column[];
  rows: Record<string, string | number>[];
}

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  inactive: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
  pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
};

const ROLE_STYLES: Record<string, string> = {
  admin: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  editor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  viewer: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

export default function DataTable({ columns, rows }: DataTableProps) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filtered = rows.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const renderCell = (key: string, value: string | number) => {
    const strVal = String(value);
    if (key === 'status') {
      return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_STYLES[strVal] || ''}`}>
          {strVal}
        </span>
      );
    }
    if (key === 'role') {
      return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${ROLE_STYLES[strVal] || ''}`}>
          {strVal}
        </span>
      );
    }
    return <span style={{ color: 'rgb(var(--foreground))' }}>{strVal}</span>;
  };

  return (
    <div className="card rounded-xl shadow-sm">
      {/* Search */}
      <div className="p-4" style={{ borderBottom: '1px solid rgb(var(--border))' }}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="w-full max-w-xs rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          style={{
            borderColor: 'rgb(var(--border))',
            backgroundColor: 'rgb(var(--muted))',
            color: 'rgb(var(--foreground))',
          }}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid rgb(var(--border))' }}>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  style={{ color: 'rgb(var(--muted-foreground))', backgroundColor: 'rgb(var(--muted))' }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-sm"
                  style={{ color: 'rgb(var(--muted-foreground))' }}
                >
                  No records found.
                </td>
              </tr>
            ) : (
              paginated.map((row, idx) => (
                <tr
                  key={idx}
                  className="transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
                  style={{ borderBottom: '1px solid rgb(var(--border))' }}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="whitespace-nowrap px-4 py-3 text-sm">
                      {renderCell(col.key, row[col.key])}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          className="flex items-center justify-between px-4 py-3 text-sm"
          style={{ borderTop: '1px solid rgb(var(--border))' }}
        >
          <span style={{ color: 'rgb(var(--muted-foreground))' }}>
            Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} of {filtered.length}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg px-3 py-1 text-sm font-medium transition-colors disabled:opacity-40"
              style={{
                border: '1px solid rgb(var(--border))',
                color: 'rgb(var(--foreground))',
              }}
            >
              ← Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`rounded-lg px-3 py-1 text-sm font-medium transition-colors ${
                  p === page ? 'bg-indigo-600 text-white' : ''
                }`}
                style={
                  p !== page
                    ? { border: '1px solid rgb(var(--border))', color: 'rgb(var(--foreground))' }
                    : {}
                }
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-lg px-3 py-1 text-sm font-medium transition-colors disabled:opacity-40"
              style={{
                border: '1px solid rgb(var(--border))',
                color: 'rgb(var(--foreground))',
              }}
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
