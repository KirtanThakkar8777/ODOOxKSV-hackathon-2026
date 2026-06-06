import DataTable from "../../../components/common/DataTable";

const PurchaseOrderTable = ({
  purchaseOrders,
}) => {
  const columns = [
    {
      header: "PO Number",
      accessor: "poNumber",
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
      header: "Order Date",
      accessor: "orderDate",
    },
    {
      header: "Status",
      accessor: "status",
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={purchaseOrders}
    />
  );
};

export default PurchaseOrderTable;