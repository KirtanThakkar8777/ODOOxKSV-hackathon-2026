import DataTable from "../../../components/common/DataTable";

const VendorTable = ({
  vendors,
}) => {
  const columns = [
    {
      header: "Company",
      accessor: "companyName",
    },
    {
      header: "Contact",
      accessor: "contactPerson",
    },
    {
      header: "Email",
      accessor: "email",
    },
    {
      header: "Phone",
      accessor: "phone",
    },
    {
      header: "Status",
      accessor: "status",
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={vendors}
    />
  );
};

export default VendorTable;