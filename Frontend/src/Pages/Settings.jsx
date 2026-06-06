import React, { useState } from 'react';
import { User, Bell, Shield, Palette, Globe, CreditCard, Save, Check } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import AnalyticsCard from '../components/cards/AnalyticsCard';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'integrations', label: 'Integrations', icon: Globe },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your account and application preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="card overflow-hidden">
            <nav className="p-2 space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-dark-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <AnalyticsCard title="Profile Information">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-700 dark:text-primary-400">JD</span>
                  </div>
                  <div>
                    <Button variant="secondary" size="sm">Change Avatar</Button>
                    <p className="text-xs text-slate-500 mt-1">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="First Name" defaultValue="John" />
                  <Input label="Last Name" defaultValue="Doe" />
                  <Input label="Email" type="email" defaultValue="john.doe@company.com" className="md:col-span-2" />
                  <Input label="Phone" type="tel" defaultValue="+1 (555) 123-4567" />
                  <Input label="Department" defaultValue="Procurement" />
                  <Input label="Job Title" defaultValue="Procurement Manager" className="md:col-span-2" />
                </div>
              </AnalyticsCard>

              <div className="flex justify-end">
                <Button onClick={handleSave} leftIcon={saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}>
                  {saved ? 'Saved!' : 'Save Changes'}
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <AnalyticsCard title="Notification Preferences">
              <div className="space-y-4">
                {[
                  { label: 'Email Notifications', desc: 'Receive email updates for important activities', checked: true },
                  { label: 'RFQ Updates', desc: 'Get notified when RFQs are updated or responded', checked: true },
                  { label: 'PO Approvals', desc: 'Notifications for purchase order approvals', checked: true },
                  { label: 'Invoice Reminders', desc: 'Reminders for upcoming invoice due dates', checked: false },
                  { label: 'System Alerts', desc: 'Important system announcements and updates', checked: true },
                  { label: 'Weekly Reports', desc: 'Receive weekly summary reports', checked: false },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-dark-700/50">
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{item.label}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-dark-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600" />
                    </label>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-6">
                <Button onClick={handleSave}>Save Preferences</Button>
              </div>
            </AnalyticsCard>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <AnalyticsCard title="Password">
                <div className="grid grid-cols-1 gap-4">
                  <Input label="Current Password" type="password" />
                  <Input label="New Password" type="password" />
                  <Input label="Confirm New Password" type="password" />
                </div>
                <div className="flex justify-end mt-4">
                  <Button>Update Password</Button>
                </div>
              </AnalyticsCard>

              <AnalyticsCard title="Two-Factor Authentication">
                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-dark-700/50">
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Enable 2FA</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Add an extra layer of security to your account</p>
                  </div>
                  <Button variant="secondary" size="sm">Enable</Button>
                </div>
              </AnalyticsCard>
            </div>
          )}

          {activeTab === 'appearance' && (
            <AnalyticsCard title="Appearance">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-dark-700/50">
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Dark Mode</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Toggle dark mode for the interface</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-dark-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600" />
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-dark-700/50">
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Compact Mode</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Reduce spacing and padding for denser layout</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-dark-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600" />
                  </label>
                </div>
              </div>
            </AnalyticsCard>
          )}

          {(activeTab === 'integrations' || activeTab === 'billing') && (
            <div className="card p-12 text-center">
              <p className="text-slate-500 dark:text-slate-400">Coming soon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;