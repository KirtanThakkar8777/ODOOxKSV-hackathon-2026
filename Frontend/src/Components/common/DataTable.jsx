import StatusBadge from "./StatusBadge";

const DataTable = ({
  columns,
  data,
}) => {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="
                text-left
                px-4
                py-3
                text-sm
                font-semibold
                "
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="border-t"
            >
              {columns.map((column) => (
                <td
                  key={column.accessor}
                  className="px-4 py-3 text-sm"
                >
                  {column.accessor === "status" ? (
                    <StatusBadge
                      status={row[column.accessor]}
                    />
                  ) : (
                    row[column.accessor]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;