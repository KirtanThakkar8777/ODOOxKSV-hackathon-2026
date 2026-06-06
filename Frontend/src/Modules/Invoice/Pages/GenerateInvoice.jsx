import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Receipt, Plus, Save, Send } from 'lucide-react';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import AnalyticsCard from '../../../components/cards/AnalyticsCard';

const GenerateInvoice = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPO, setSelectedPO] = useState('');
  const [formData, setFormData] = useState({
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    paymentTerms: 'Net 30',
    notes: '',
  });

  const purchaseOrders = [
    { id: 'PO-2024-045', vendor: 'TechCorp Solutions', amount: 118500, status: 'completed' },
    { id: 'PO-2024-044', vendor: 'GlobalSupply Inc', amount: 42000, status: 'completed' },
    { id: 'PO-2024-043', vendor: 'PrimeParts Ltd', amount: 275000, status: 'completed' },
    { id: 'PO-2024-042', vendor: 'FastShip Logistics', amount: 75000, status: 'completed' },
  ];

  const selectedOrder = purchaseOrders.find(po => po.id === selectedPO);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/invoices');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/invoices" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-700 text-slate-500 dark:text-slate-400">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Generate Invoice</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Create a new invoice from a completed purchase order.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <AnalyticsCard title="Select Purchase Order">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Purchase Order</label>
                  <select 
                    className="input-field"
                    value={selectedPO}
                    onChange={(e) => setSelectedPO(e.target.value)}
                    required
                  >
                    <option value="">Select a completed PO</option>
                    {purchaseOrders.map(po => (
                      <option key={po.id} value={po.id}>{po.id} - {po.vendor} - ${po.amount.toLocaleString()}</option>
                    ))}
                  </select>
                </div>

                {selectedOrder && (
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-dark-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{selectedOrder.id}</span>
                      <span className="text-sm text-green-600 font-medium">{selectedOrder.status}</span>
                    </div>
                    <p className="text-sm text-slate-500">{selectedOrder.vendor}</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">${selectedOrder.amount.toLocaleString()}</p>
                  </div>
                )}
              </div>
            </AnalyticsCard>

            <AnalyticsCard title="Invoice Details">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    label="Invoice Date" 
                    type="date"
                    value={formData.invoiceDate}
                    onChange={(e) => setFormData({...formData, invoiceDate: e.target.value})}
                  />
                  <Input 
                    label="Due Date" 
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Payment Terms</label>
                  <select 
                    className="input-field"
                    value={formData.paymentTerms}
                    onChange={(e) => setFormData({...formData, paymentTerms: e.target.value})}
                  >
                    <option>Net 15</option>
                    <option>Net 30</option>
                    <option>Net 45</option>
                    <option>Net 60</option>
                    <option>Due on Receipt</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Notes</label>
                  <textarea 
                    className="input-field min-h-[100px] resize-none"
                    placeholder="Additional notes for the invoice..."
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  />
                </div>
              </div>
            </AnalyticsCard>
          </div>

          <div className="space-y-6">
            <AnalyticsCard title="Summary">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Subtotal</span>
                  <span className="text-sm font-medium">${selectedOrder ? selectedOrder.amount.toLocaleString() : '0'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Tax</span>
                  <span className="text-sm font-medium">$0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Shipping</span>
                  <span className="text-sm font-medium">$0</span>
                </div>
                <div className="pt-3 border-t border-slate-200 dark:border-dark-700 flex justify-between">
                  <span className="text-base font-semibold text-slate-900 dark:text-white">Total</span>
                  <span className="text-xl font-bold text-slate-900 dark:text-white">${selectedOrder ? selectedOrder.amount.toLocaleString() : '0'}</span>
                </div>
              </div>
            </AnalyticsCard>

            <AnalyticsCard title="Actions">
              <div className="space-y-3">
                <Button 
                  type="submit" 
                  isLoading={isLoading} 
                  className="w-full justify-center" 
                  leftIcon={<Receipt className="w-4 h-4" />}
                  disabled={!selectedPO}
                >
                  Generate Invoice
                </Button>
                <Button variant="secondary" className="w-full justify-center" leftIcon={<Save className="w-4 h-4" />}>
                  Save as Draft
                </Button>
                <Link to="/invoices" className="block">
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

export default GenerateInvoice;