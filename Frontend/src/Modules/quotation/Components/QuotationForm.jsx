import React from 'react';
import { Quote, FileText } from 'lucide-react';
import Input from '../../../components/common/Input';
import AnalyticsCard from '../../../components/cards/AnalyticsCard';

const QuotationForm = ({ formData, setFormData }) => {
  return (
    <div className="space-y-6">
      <AnalyticsCard title="Quotation Information">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Select RFQ</label>
            <select className="input-field" value={formData.rfq} onChange={(e) => setFormData({...formData, rfq: e.target.value})}>
              <option value="">Select RFQ</option>
              <option>RFQ-2024-001 - IT Equipment Procurement</option>
              <option>RFQ-2024-002 - Office Furniture Supply</option>
              <option>RFQ-2024-003 - Network Infrastructure</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Vendor</label>
            <select className="input-field" value={formData.vendor} onChange={(e) => setFormData({...formData, vendor: e.target.value})}>
              <option value="">Select Vendor</option>
              <option>TechCorp Solutions</option>
              <option>GlobalSupply Inc</option>
              <option>PrimeParts Ltd</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Total Amount" type="number" icon={<span className="text-slate-400">$</span>} value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} />
            <Input label="Delivery Time" value={formData.delivery} onChange={(e) => setFormData({...formData, delivery: e.target.value})} placeholder="e.g., 14 days" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Valid Until" type="date" value={formData.validity} onChange={(e) => setFormData({...formData, validity: e.target.value})} />
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Warranty</label>
              <select className="input-field" value={formData.warranty} onChange={(e) => setFormData({...formData, warranty: e.target.value})}>
                <option>1 year</option>
                <option>2 years</option>
                <option>3 years</option>
                <option>5 years</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Terms & Conditions</label>
            <textarea className="input-field min-h-[100px] resize-none" value={formData.terms} onChange={(e) => setFormData({...formData, terms: e.target.value})} placeholder="Payment terms, delivery conditions, etc." />
          </div>
        </div>
      </AnalyticsCard>
    </div>
  );
};

export default QuotationForm;