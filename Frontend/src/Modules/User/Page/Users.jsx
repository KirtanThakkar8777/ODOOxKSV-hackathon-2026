import { useEffect, useState } from "react";

import Header from "../../../components/layout/Header";
import DataTable from "../../../components/common/DataTable";

import userService from "../services/user.service";

const Users = () => {
  const [users, setUsers] =
    useState([]);

  useEffect(() => {
    const fetchUsers =
      async () => {
        const data =
          await userService.getUsers();

        setUsers(data);
      };

    fetchUsers();
  }, []);

  const columns = [
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "Email",
      accessor: "email",
    },
    {
      header: "Role",
      accessor: "role",
    },
  ];

  return (
    <div>
      <Header
        title="Users"
        subtitle="Manage system users"
      />

      <DataTable
        columns={columns}
        data={users}
      />
    </div>
  );
};

export default Users;