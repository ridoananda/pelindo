import { useState, useMemo } from 'react';

export default function Table({ columns, data, actions, itemsPerPage = 10 }) {
  // Remove pagination state and logic, just use all data
  // const [currentPage, setCurrentPage] = useState(1);
  // const paginatedData = useMemo(() => {
  //   const startIndex = (currentPage - 1) * itemsPerPage;
  //   const endIndex = startIndex + itemsPerPage;
  //   return data.slice(startIndex, endIndex);
  // }, [data, currentPage, itemsPerPage]);
  // const totalPages = Math.ceil(data.length / itemsPerPage);
  // const goToPage = (page) => {
  //   setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  // };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
              {actions && <th className="px-4 md:px-6 py-3 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-4 md:px-6 py-4 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                      <div className="max-w-[150px] md:max-w-none overflow-hidden text-ellipsis">
                        {column.cell ? column.cell(row[column.accessor], row, rowIndex) : row[column.accessor]}
                      </div>
                    </td>
                  ))}
                  {actions && (
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {actions(row)}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-4 md:px-6 py-4 text-center text-sm text-gray-500">
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination removed */}
    </div>
  );
}
