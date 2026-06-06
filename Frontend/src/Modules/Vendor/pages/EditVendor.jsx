import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Building2, User, Mail, Phone, MapPin, Globe, FileText } from 'lucide-react';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import AnalyticsCard from '../../../components/cards/AnalyticsCard';

const EditVendor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: 'TechCorp Solutions',
    category: 'IT Equipment',
    contactName: 'James Wilson',
    email: 'james@techcorp.com',
    phone: '+1 (555) 234-5678',
    address: '123 Tech Street',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    website: 'www.techcorp.com',
    taxId: '12-3456789',
    paymentTerms: 'Net 30',
    description: 'Leading provider of IT equipment and technology solutions.',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate(`/vendors/${id}`);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to={`/vendors/${id}`} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-700 text-slate-500 dark:text-slate-400">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Edit Vendor</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Update vendor information.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnalyticsCard title="Company Information">
            <div className="space-y-4">
              <Input 
                label="Company Name" 
                required 
                icon={<Building2 className="w-4 h-4" />}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Category</label>
                  <select className="input-field" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                    <option>IT Equipment</option>
                    <option>Office Supplies</option>
                    <option>Manufacturing</option>
                    <option>Logistics</option>
                  </select>
                </div>
                <Input label="Tax ID" icon={<FileText className="w-4 h-4" />} value={formData.taxId} onChange={(e) => setFormData({...formData, taxId: e.target.value})} />
              </div>
              <Input label="Website" icon={<Globe className="w-4 h-4" />} value={formData.website} onChange={(e) => setFormData({...formData, website: e.target.value})} />
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Description</label>
                <textarea className="input-field min-h-[100px] resize-none" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
              </div>
            </div>
          </AnalyticsCard>

          <AnalyticsCard title="Contact Information">
            <div className="space-y-4">
              <Input label="Contact Name" required icon={<User className="w-4 h-4" />} value={formData.contactName} onChange={(e) => setFormData({...formData, contactName: e.target.value})} />
              <Input label="Email" type="email" required icon={<Mail className="w-4 h-4" />} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              <Input label="Phone" icon={<Phone className="w-4 h-4" />} value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              <Input label="Address" icon={<MapPin className="w-4 h-4" />} value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
              <div className="grid grid-cols-3 gap-4">
                <Input label="City" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
                <Input label="State" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} />
                <Input label="ZIP" value={formData.zip} onChange={(e) => setFormData({...formData, zip: e.target.value})} />
              </div>
            </div>
          </AnalyticsCard>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link to={`/vendors/${id}`}>
            <Button variant="secondary" type="button">Cancel</Button>
          </Link>
          <Button type="submit" isLoading={isLoading} leftIcon={<Save className="w-4 h-4" />}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditVendor;