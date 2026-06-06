import React, { useState } from 'react';
import { Mail, Phone, Building2, MapPin, Calendar, Edit2, Save, Camera } from 'lucide-react';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import AnalyticsCard from '../../../components/cards/AnalyticsCard';
import StatusBadge from '../../../components/common/StatusBadge';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user] = useState({
    name: 'John Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    department: 'Procurement',
    title: 'Procurement Manager',
    company: 'Acme Corporation',
    location: 'New York, NY',
    joinDate: '2023-01-15',
    role: 'admin',
    status: 'active',
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-Black">Profile</h1>
        <Button 
          variant="secondary" 
          leftIcon={isEditing ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      {/* Profile Header */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-3xl font-bold text-primary-700 dark:text-primary-400">
              JD
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary-600 text-black flex items-center justify-center hover:bg-primary-700">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-bold text-slate-900 dark:text-black">{user.name}</h2>
              <StatusBadge status={user.status} />
            </div>
            <p className="text-slate-500 dark:text-slate-400">{user.title} at {user.company}</p>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-500 dark:text-black">
              <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> {user.email}</span>
              <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> {user.phone}</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {user.location}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Joined {user.joinDate}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsCard title="Personal Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="First Name" defaultValue="John" disabled={!isEditing} />
            <Input label="Last Name" defaultValue="Doe" disabled={!isEditing} />
            <Input label="Email" type="email" defaultValue={user.email} disabled={!isEditing} className="md:col-span-2" />
            <Input label="Phone" defaultValue={user.phone} disabled={!isEditing} />
            <Input label="Department" defaultValue={user.department} disabled={!isEditing} />
            <Input label="Job Title" defaultValue={user.title} disabled={!isEditing} />
            <Input label="Location" defaultValue={user.location} disabled={!isEditing} />
          </div>
        </AnalyticsCard>

        <AnalyticsCard title="Account Information">
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-dark-700/50">
              <p className="text-sm font-medium text-slate-900 dark:text-black mb-1">Role</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 capitalize">{user.role}</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-dark-700/50">
              <p className="text-sm font-medium text-slate-900 dark:text-black mb-1">Member Since</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{user.joinDate}</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-dark-700/50">
              <p className="text-sm font-medium text-slate-900 dark:text-black mb-1">Last Login</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Today at 09:45 AM</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-dark-700/50">
              <p className="text-sm font-medium text-slate-900 dark:text-black mb-1">Two-Factor Authentication</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-sm text-slate-500 dark:text-slate-400">Not enabled</p>
                <Button variant="secondary" size="sm">Enable</Button>
              </div>
            </div>
          </div>
        </AnalyticsCard>
      </div>
    </div>
  );
};

export default Profile;