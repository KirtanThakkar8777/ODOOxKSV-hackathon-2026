import React from 'react';
import { ShoppingCart, Plus, Trash2 } from 'lucide-react';
import Input from '../../../components/common/Input';
import AnalyticsCard from '../../../components/cards/AnalyticsCard';
import Button from '../../../components/common/Button';

const PurchaseOrderForm = ({ formData, setFormData, items, setItems }) => {
  const addItem = () => {
    setItems([...items, { id: Date.now(), name: '', quantity: 1, unitPrice: 0, description: '' }]);
  };

  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id, field, value) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);

  return (
    <div className="space-y-6">
      <AnalyticsCard title="Order Information">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Select RFQ</label>
              <select className="input-field" value={formData.rfq} onChange={(e) => setFormData({...formData, rfq: e.target.value})}>
                <option value="">Select RFQ</option>
                <option>RFQ-2024-001 - IT Equipment Procurement</option>
                <option>RFQ-2024-002 - Office Furniture Supply</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Vendor</label>
              <select className="input-field" value={formData.vendor} onChange={(e) => setFormData({...formData, vendor: e.target.value})}>
                <option value="">Select Vendor</option>
                <option>TechCorp Solutions</option>
                <option>GlobalSupply Inc</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Delivery Date" type="date" value={formData.deliveryDate} onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})} />
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Payment Terms</label>
              <select className="input-field" value={formData.paymentTerms} onChange={(e) => setFormData({...formData, paymentTerms: e.target.value})}>
                <option>Net 15</option>
                <option>Net 30</option>
                <option>Net 45</option>
                <option>Net 60</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Shipping Address</label>
            <textarea className="input-field min-h-[80px] resize-none" value={formData.shippingAddress} onChange={(e) => setFormData({...formData, shippingAddress: e.target.value})} placeholder="Enter shipping address..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Notes</label>
            <textarea className="input-field min-h-[80px] resize-none" value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} placeholder="Additional notes..." />
          </div>
        </div>
      </AnalyticsCard>

      <AnalyticsCard title="Line Items" action={
        <Button variant="secondary" size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={addItem}>
          Add Item
        </Button>
      }>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={item.id} className="p-4 rounded-lg bg-slate-50 dark:bg-dark-700/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">Item #{index + 1}</span>
                <button onClick={() => removeItem(item.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input className="input-field" placeholder="Item name" value={item.name} onChange={(e) => updateItem(item.id, 'name', e.target.value)} />
                <div className="grid grid-cols-3 gap-3">
                  <input className="input-field" type="number" placeholder="Qty" value={item.quantity} onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)} />
                  <input className="input-field" type="number" placeholder="Unit $" value={item.unitPrice} onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)} />
                  <input className="input-field bg-slate-100 dark:bg-dark-600" value={`$${(item.quantity * item.unitPrice).toLocaleString()}`} readOnly />
                </div>
              </div>
              <input className="input-field" placeholder="Description (optional)" value={item.description} onChange={(e) => updateItem(item.id, 'description', e.target.value)} />
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-dark-700 flex justify-end">
          <div className="text-right">
            <p className="text-sm text-slate-500">Total</p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">${totalAmount.toLocaleString()}</p>
          </div>
        </div>
      </AnalyticsCard>
    </div>
  );
};

export default PurchaseOrderForm;