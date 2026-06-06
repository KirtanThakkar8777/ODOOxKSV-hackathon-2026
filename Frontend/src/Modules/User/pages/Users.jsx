import React, { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, Edit2, Trash2, UserCheck } from 'lucide-react';
import Button from '../../../components/common/Button';
import SearchBar from '../../../components/common/SearchBar';
import DataTable from '../../../components/common/DataTable';
import StatusBadge from '../../../components/common/StatusBadge';
import Modal from '../../../components/common/Modal';

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@company.com', role: 'Admin', department: 'Procurement', status: 'active', lastActive: '2024-06-06T10:30:00' },
    { id: 2, name: 'Sarah Smith', email: 'sarah@company.com', role: 'Manager', department: 'Finance', status: 'active', lastActive: '2024-06-06T09:15:00' },
    { id: 3, name: 'Mike Johnson', email: 'mike@company.com', role: 'Procurement', department: 'Operations', status: 'active', lastActive: '2024-06-05T16:45:00' },
    { id: 4, name: 'Emily Brown', email: 'emily@company.com', role: 'Viewer', department: 'IT', status: 'inactive', lastActive: '2024-06-01T14:20:00' },
    { id: 5, name: 'David Wilson', email: 'david@company.com', role: 'Manager', department: 'Procurement', status: 'active', lastActive: '2024-06-06T08:00:00' },
  ]);

  const columns = [
    { key: 'name', title: 'Name', render: (val, row) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
          <span className="text-xs font-semibold text-primary-700 dark:text-primary-400">{val.charAt(0)}</span>
        </div>
        <div>
          <p className="font-medium text-slate-900 dark:text-white">{val}</p>
          <p className="text-xs text-slate-500">{row.email}</p>
        </div>
      </div>
    )},
    { key: 'role', title: 'Role', render: (val) => (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-dark-700 dark:text-slate-300">
        {val}
      </span>
    )},
    { key: 'department', title: 'Department' },
    { key: 'status', title: 'Status', render: (val) => <StatusBadge status={val} /> },
    { key: 'lastActive', title: 'Last Active', render: (val) => new Date(val).toLocaleDateString() },
    { key: 'actions', title: '', width: '100px', render: (_, row) => (
      <div className="flex items-center gap-1">
        <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-700 text-slate-400 hover:text-slate-600">
          <Edit2 className="w-4 h-4" />
        </button>
        <button className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-600">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    )},
  ];

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">User Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage team members and their access levels.</p>
        </div>
        <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setShowAddModal(true)}>
          Add User
        </Button>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchBar 
            value={searchQuery} 
            onChange={setSearchQuery} 
            placeholder="Search users..."
            className="flex-1"
          />
          <Button variant="secondary" leftIcon={<Filter className="w-4 h-4" />}>Filter</Button>
        </div>
      </div>

      {/* Users Table */}
      <div className="card overflow-hidden">
        <DataTable 
          columns={columns} 
          data={filteredUsers}
          pageSize={10}
        />
      </div>

      {/* Add User Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New User"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button onClick={() => setShowAddModal(false)}>Add User</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input className="input-field" placeholder="First Name" />
            <input className="input-field" placeholder="Last Name" />
          </div>
          <input className="input-field" placeholder="Email Address" type="email" />
          <select className="input-field">
            <option>Select Role</option>
            <option>Admin</option>
            <option>Manager</option>
            <option>Procurement</option>
            <option>Viewer</option>
          </select>
          <select className="input-field">
            <option>Select Department</option>
            <option>Procurement</option>
            <option>Finance</option>
            <option>Operations</option>
            <option>IT</option>
          </select>
        </div>
      </Modal>
    </div>
  );
};

export default Users;