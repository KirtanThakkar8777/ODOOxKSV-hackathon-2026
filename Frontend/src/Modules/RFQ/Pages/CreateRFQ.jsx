import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Save, Send, FileText } from 'lucide-react';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import AnalyticsCard from '../../../components/cards/AnalyticsCard';

const CreateRFQ = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([
    { id: 1, name: '', quantity: 1, unitPrice: 0, description: '' },
  ]);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    vendor: '',
    budget: '',
    deadline: '',
    priority: 'medium',
    description: '',
    terms: '',
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/rfqs');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/rfqs" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-700 text-slate-500 dark:text-slate-400">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create RFQ</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Create a new Request for Quotation.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <AnalyticsCard title="RFQ Information">
              <div className="space-y-4">
                <Input 
                  label="RFQ Title" 
                  required 
                  icon={<FileText className="w-4 h-4" />}
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., IT Equipment Procurement"
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Category</label>
                    <select 
                      className="input-field"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      <option value="">Select Category</option>
                      <option>IT Equipment</option>
                      <option>Office Supplies</option>
                      <option>Manufacturing</option>
                      <option>Logistics</option>
                      <option>Services</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Priority</label>
                    <select 
                      className="input-field"
                      value={formData.priority}
                      onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Description</label>
                  <textarea 
                    className="input-field min-h-[100px] resize-none"
                    placeholder="Describe the requirements and scope..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
              </div>
            </AnalyticsCard>

            <AnalyticsCard title="Line Items" action={
              <Button variant="secondary" size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={addItem} type="button">
                Add Item
              </Button>
            }>
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={item.id} className="p-4 rounded-lg bg-slate-50 dark:bg-dark-700/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-500">Item #{index + 1}</span>
                      <button 
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input 
                        className="input-field" 
                        placeholder="Item name"
                        value={item.name}
                        onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                      />
                      <div className="grid grid-cols-3 gap-3">
                        <input 
                          className="input-field" 
                          type="number" 
                          placeholder="Qty"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                        />
                        <input 
                          className="input-field" 
                          type="number" 
                          placeholder="Unit $"
                          value={item.unitPrice}
                          onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                        />
                        <input 
                          className="input-field bg-slate-100 dark:bg-dark-600" 
                          value={`$${(item.quantity * item.unitPrice).toLocaleString()}`}
                          readOnly
                        />
                      </div>
                    </div>
                    <input 
                      className="input-field" 
                      placeholder="Description (optional)"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-dark-700 flex justify-end">
                <div className="text-right">
                  <p className="text-sm text-slate-500">Total Estimated</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">${totalAmount.toLocaleString()}</p>
                </div>
              </div>
            </AnalyticsCard>
          </div>

          <div className="space-y-6">
            <AnalyticsCard title="Vendor & Budget">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Select Vendor</label>
                  <select 
                    className="input-field"
                    value={formData.vendor}
                    onChange={(e) => setFormData({...formData, vendor: e.target.value})}
                  >
                    <option value="">Select Vendor</option>
                    <option>TechCorp Solutions</option>
                    <option>GlobalSupply Inc</option>
                    <option>PrimeParts Ltd</option>
                    <option>FastShip Logistics</option>
                  </select>
                </div>
                <Input 
                  label="Budget" 
                  type="number" 
                  icon={<span className="text-slate-400">$</span>}
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  placeholder="Enter budget amount"
                />
                <Input 
                  label="Deadline" 
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                />
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Terms & Conditions</label>
                  <textarea 
                    className="input-field min-h-[120px] resize-none"
                    placeholder="Payment terms, delivery requirements, etc."
                    value={formData.terms}
                    onChange={(e) => setFormData({...formData, terms: e.target.value})}
                  />
                </div>
              </div>
            </AnalyticsCard>

            <AnalyticsCard title="Actions">
              <div className="space-y-3">
                <Button type="submit" isLoading={isLoading} className="w-full justify-center" leftIcon={<Send className="w-4 h-4" />}>
                  Publish RFQ
                </Button>
                <Button variant="secondary" className="w-full justify-center" leftIcon={<Save className="w-4 h-4" />}>
                  Save as Draft
                </Button>
                <Link to="/rfqs" className="block">
                  <Button variant="ghost" className="w-full justify-center">Cancel</Button>
                </Link>
              </div>
            </AnalyticsCard>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateRFQ;