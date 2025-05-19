import React from "react";

import { ReusableTableProps } from "./table";

function ReusableTable<T>({ data, columns }: ReusableTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-200">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-4 py-2 border text-left font-medium"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-4 text-gray-500"
              >
                No records found
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-100">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-4 py-2 border">
                    {typeof col.accessor === "function"
                      ? col.accessor(row)
                      : (row[col.accessor] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ReusableTable;
