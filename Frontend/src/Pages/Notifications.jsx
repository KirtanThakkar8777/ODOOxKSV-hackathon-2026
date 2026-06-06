import React, { useState } from 'react';
import { Bell, Check, Trash2, Filter, CheckCircle, AlertTriangle, Info, MessageSquare, ShoppingCart, FileText } from 'lucide-react';
import Button from '../components/common/Button';
import AnalyticsCard from '../components/cards/AnalyticsCard';

const Notifications = () => {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'rfq', title: 'New RFQ Response', message: 'TechCorp submitted a quotation for RFQ-2024-001 worth $125,000', time: '5 min ago', read: false, icon: FileText, color: 'blue' },
    { id: 2, type: 'po', title: 'PO Approved', message: 'Purchase Order PO-2024-045 has been approved by John Doe', time: '1 hour ago', read: false, icon: ShoppingCart, color: 'green' },
    { id: 3, type: 'invoice', title: 'Invoice Due', message: 'Invoice INV-2024-089 for $45,000 is due tomorrow', time: '3 hours ago', read: false, icon: AlertTriangle, color: 'red' },
    { id: 4, type: 'message', title: 'New Message', message: 'Sarah Smith sent a message regarding RFQ-2024-003', time: '5 hours ago', read: true, icon: MessageSquare, color: 'purple' },
    { id: 5, type: 'rfq', title: 'RFQ Deadline Approaching', message: 'RFQ-2024-008 closes in 24 hours. 3 vendors have responded.', time: '1 day ago', read: true, icon: FileText, color: 'orange' },
    { id: 6, type: 'po', title: 'Order Shipped', message: 'Purchase Order PO-2024-042 has been shipped by FastShip', time: '2 days ago', read: true, icon: ShoppingCart, color: 'blue' },
    { id: 7, type: 'system', title: 'System Update', message: 'VendorBridge has been updated to version 2.4.0', time: '3 days ago', read: true, icon: Info, color: 'gray' },
  ]);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications.filter(n => n.type === filter);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Notifications</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">You have {unreadCount} unread notifications</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" onClick={markAllRead} leftIcon={<Check className="w-4 h-4" />}>
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {['all', 'unread', 'rfq', 'po', 'invoice', 'message'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition-colors ${
              filter === f 
                ? 'bg-primary-600 text-white' 
                : 'bg-white dark:bg-dark-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-700 border border-slate-200 dark:border-dark-700'
            }`}
          >
            {f === 'all' ? 'All' : f === 'po' ? 'Purchase Orders' : f}
            {f === 'all' && <span className="ml-1.5 bg-white/20 px-1.5 py-0.5 rounded-full text-xs">{notifications.length}</span>}
            {f === 'unread' && <span className="ml-1.5 bg-red-500 text-white px-1.5 py-0.5 rounded-full text-xs">{unreadCount}</span>}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <div 
              key={notification.id}
              className={`card p-4 flex items-start gap-4 transition-colors ${
                !notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800' : ''
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                notification.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                notification.color === 'green' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                notification.color === 'red' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                notification.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' :
                notification.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' :
                'bg-slate-100 dark:bg-dark-700 text-slate-600 dark:text-slate-400'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {notification.title}
                      {!notification.read && <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full inline-block" />}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{notification.message}</p>
                  </div>
                  <span className="text-xs text-slate-400 whitespace-nowrap">{notification.time}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {!notification.read && (
                  <button 
                    onClick={() => markRead(notification.id)}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    title="Mark as read"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
                <button 
                  onClick={() => deleteNotification(notification.id)}
                  className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-600"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
        {filteredNotifications.length === 0 && (
          <div className="card p-12 text-center">
            <Bell className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-slate-500 dark:text-slate-400">No notifications found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;