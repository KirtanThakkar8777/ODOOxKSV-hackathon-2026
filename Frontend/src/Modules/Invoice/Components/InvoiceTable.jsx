import DataTable from "../../../components/common/DataTable";

const InvoiceTable = ({
  invoices,
}) => {
  const columns = [
    {
      header: "Invoice No",
      accessor: "invoiceNumber",
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
      header: "Due Date",
      accessor: "dueDate",
    },
    {
      header: "Status",
      accessor: "status",
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={invoices}
    />
  );
};

export default InvoiceTable;