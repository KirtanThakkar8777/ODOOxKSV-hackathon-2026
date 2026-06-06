import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Star, DollarSign, Clock, TrendingDown, Award, Building2 } from 'lucide-react';
import Button from '../../../components/common/Button';
import AnalyticsCard from '../../../components/cards/AnalyticsCard';
import StatusBadge from '../../../components/common/StatusBadge';

const QuotationComparison = () => {
  const [selectedVendor, setSelectedVendor] = useState('TechCorp');

  const rfq = {
    id: 'RFQ-2024-001',
    title: 'IT Equipment Procurement',
    budget: 125000,
  };

  const quotations = [
    { id: 'QT-2024-045', vendor: 'TechCorp Solutions', rating: 4.8, amount: 118500, delivery: '14 days', warranty: '2 years', support: 'Included', status: 'submitted' },
    { id: 'QT-2024-046', vendor: 'GlobalSupply Inc', rating: 4.5, amount: 122000, delivery: '21 days', warranty: '1 year', support: 'Extra fee', status: 'submitted' },
    { id: 'QT-2024-047', vendor: 'PrimeParts Ltd', rating: 4.7, amount: 115000, delivery: '10 days', warranty: '3 years', support: 'Included', status: 'submitted' },
  ];

  const items = [
    { name: 'Laptop - Dell XPS 15', qty: 25, techCorp: 1700, globalSupply: 1750, primeParts: 1680 },
    { name: 'Monitor - 27" 4K Display', qty: 30, techCorp: 420, globalSupply: 430, primeParts: 410 },
    { name: 'Keyboard & Mouse Set', qty: 30, techCorp: 110, globalSupply: 115, primeParts: 108 },
    { name: 'Docking Station', qty: 25, techCorp: 240, globalSupply: 250, primeParts: 235 },
    { name: 'Webcam HD', qty: 30, techCorp: 80, globalSupply: 85, primeParts: 78 },
  ];

  const totals = {
    techCorp: items.reduce((sum, item) => sum + (item.qty * item.techCorp), 0),
    globalSupply: items.reduce((sum, item) => sum + (item.qty * item.globalSupply), 0),
    primeParts: items.reduce((sum, item) => sum + (item.qty * item.primeParts), 0),
  };

  const lowestBid = Math.min(totals.techCorp, totals.globalSupply, totals.primeParts);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/quotations" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-700 text-slate-500 dark:text-slate-400">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Quotation Comparison</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Compare quotations for {rfq.id} - {rfq.title}</p>
        </div>
      </div>

      {/* Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quotations.map((q, index) => {
          const total = [totals.techCorp, totals.globalSupply, totals.primeParts][index];
          const isLowest = total === lowestBid;
          const colors = ['bg-blue-50 dark:bg-blue-900/20', 'bg-purple-50 dark:bg-purple-900/20', 'bg-green-50 dark:bg-green-900/20'];
          const borderColors = ['border-blue-200 dark:border-blue-800', 'border-purple-200 dark:border-purple-800', 'border-green-200 dark:border-green-800'];

          return (
            <div key={q.id} className={`card p-5 ${isLowest ? `ring-2 ring-green-500 ${colors[2]}` : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors[index]}`}>
                    <Building2 className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{q.vendor}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs text-slate-500">{q.rating}</span>
                    </div>
                  </div>
                </div>
                {isLowest && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                    <Award className="w-3 h-3" /> Best Price
                  </span>
                )}
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Total Amount</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Delivery</span>
                  <span className="text-sm">{q.delivery}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Warranty</span>
                  <span className="text-sm">{q.warranty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Support</span>
                  <span className="text-sm">{q.support}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-dark-700">
                <Button className="w-full justify-center" size="sm">Select Vendor</Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Comparison Table */}
      <AnalyticsCard title="Item-by-Item Comparison">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-dark-700">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Item</th>
                <th className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Qty</th>
                <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">TechCorp</th>
                <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">GlobalSupply</th>
                <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">PrimeParts</th>
                <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Best Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-dark-700">
              {items.map((item, index) => {
                const prices = [item.techCorp, item.globalSupply, item.primeParts];
                const minPrice = Math.min(...prices);
                return (
                  <tr key={index}>
                    <td className="px-4 py-3 text-sm text-slate-900 dark:text-white">{item.name}</td>
                    <td className="px-4 py-3 text-sm text-center text-slate-600 dark:text-slate-300">{item.qty}</td>
                    <td className={`px-4 py-3 text-sm text-right ${item.techCorp === minPrice ? 'font-bold text-green-600' : 'text-slate-600'}`}>${item.techCorp}</td>
                    <td className={`px-4 py-3 text-sm text-right ${item.globalSupply === minPrice ? 'font-bold text-green-600' : 'text-slate-600'}`}>${item.globalSupply}</td>
                    <td className={`px-4 py-3 text-sm text-right ${item.primeParts === minPrice ? 'font-bold text-green-600' : 'text-slate-600'}`}>${item.primeParts}</td>
                    <td className="px-4 py-3 text-sm text-right font-bold text-green-600">${minPrice}</td>
                  </tr>
                );
              })}
              <tr className="bg-slate-50 dark:bg-dark-700/50 font-semibold">
                <td className="px-4 py-3 text-sm text-slate-900 dark:text-white">Total</td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3 text-sm text-right">${totals.techCorp.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-right">${totals.globalSupply.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-right">${totals.primeParts.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-right text-green-600">${lowestBid.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center gap-3">
          <TrendingDown className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-sm font-medium text-green-700 dark:text-green-400">
              Potential Savings: ${(rfq.budget - lowestBid).toLocaleString()} ({((rfq.budget - lowestBid) / rfq.budget * 100).toFixed(1)}% under budget)
            </p>
          </div>
        </div>
      </AnalyticsCard>
    </div>
  );
};

export default QuotationComparison;