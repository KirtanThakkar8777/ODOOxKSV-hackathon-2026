import DataTable from "../../../components/common/DataTable";

const QuotationTable = ({
  quotations,
}) => {
  const columns = [
    {
      header: "Quotation No",
      accessor: "quotationNo",
    },
    {
      header: "Vendor",
      accessor: "vendorName",
    },
    {
      header: "Amount",
      accessor: "amount",
    },
    {
      header: "Submission Date",
      accessor: "submissionDate",
    },
    {
      header: "Status",
      accessor: "status",
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={quotations}
    />
  );
};

export default QuotationTable;