const ComparisonTable = ({
  quotations,
}) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-slate-200">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-3 text-left">
              Vendor
            </th>
            <th className="p-3 text-left">
              Amount
            </th>
            <th className="p-3 text-left">
              Delivery Days
            </th>
            <th className="p-3 text-left">
              Warranty
            </th>
          </tr>
        </thead>

        <tbody>
          {quotations?.map(
            (quotation) => (
              <tr
                key={quotation._id}
                className="border-t"
              >
                <td className="p-3">
                  {
                    quotation.vendorName
                  }
                </td>

                <td className="p-3">
                  {quotation.amount}
                </td>

                <td className="p-3">
                  {
                    quotation.deliveryDays
                  }
                </td>

                <td className="p-3">
                  {
                    quotation.warranty
                  }
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;