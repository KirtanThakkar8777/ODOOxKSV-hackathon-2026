import React from 'react';
import { Receipt, FileText } from 'lucide-react';
import Input from '../../../components/common/Input';
import AnalyticsCard from '../../../components/cards/AnalyticsCard';

const InvoiceForm = ({ formData, setFormData, selectedPO }) => {
  return (
    <div className="space-y-6">
      <AnalyticsCard title="Select Purchase Order">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Purchase Order</label>
            <select className="input-field" value={formData.po} onChange={(e) => setFormData({...formData, po: e.target.value})}>
              <option value="">Select a completed PO</option>
              <option>PO-2024-045 - TechCorp Solutions - $118,500</option>
              <option>PO-2024-044 - GlobalSupply Inc - $42,000</option>
              <option>PO-2024-043 - PrimeParts Ltd - $275,000</option>
            </select>
          </div>
          {selectedPO && (
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-dark-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-900 dark:text-white">{selectedPO.id}</span>
                <span className="text-sm text-green-600 font-medium">{selectedPO.status}</span>
              </div>
              <p className="text-sm text-slate-500">{selectedPO.vendor}</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">${selectedPO.amount.toLocaleString()}</p>
            </div>
          )}
        </div>
      </AnalyticsCard>

      <AnalyticsCard title="Invoice Details">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Invoice Date" type="date" value={formData.invoiceDate} onChange={(e) => setFormData({...formData, invoiceDate: e.target.value})} />
            <Input label="Due Date" type="date" value={formData.dueDate} onChange={(e) => setFormData({...formData, dueDate: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Payment Terms</label>
            <select className="input-field" value={formData.paymentTerms} onChange={(e) => setFormData({...formData, paymentTerms: e.target.value})}>
              <option>Net 15</option>
              <option>Net 30</option>
              <option>Net 45</option>
              <option>Net 60</option>
              <option>Due on Receipt</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Notes</label>
            <textarea className="input-field min-h-[100px] resize-none" value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} placeholder="Additional notes for the invoice..." />
          </div>
        </div>
      </AnalyticsCard>
    </div>
  );
};

export default InvoiceForm;