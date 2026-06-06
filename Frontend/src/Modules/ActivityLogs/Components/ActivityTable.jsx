import DataTable from "../../../components/common/DataTable";

const ActivityTable = ({
  activities,
}) => {
  const columns = [
    {
      header: "User",
      accessor: "user",
    },
    {
      header: "Action",
      accessor: "action",
    },
    {
      header: "Module",
      accessor: "module",
    },
    {
      header: "Date",
      accessor: "createdAt",
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={activities}
    />
  );
};

export default ActivityTable;