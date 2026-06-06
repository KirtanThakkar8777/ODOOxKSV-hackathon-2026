import DataTable from "../../../components/common/DataTable";

const RFQTable = ({ rfqs }) => {
  const columns = [
    {
      header: "RFQ No",
      accessor: "rfqNo",
    },
    {
      header: "Title",
      accessor: "title",
    },
    {
      header: "Deadline",
      accessor: "deadline",
    },
    {
      header: "Status",
      accessor: "status",
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={rfqs}
    />
  );
};

export default RFQTable;