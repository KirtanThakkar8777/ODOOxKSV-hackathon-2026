import React from 'react';
import { CheckCircle, XCircle, Minus } from 'lucide-react';

const ComparisonTable = ({ quotations, items }) => {
  const vendors = quotations.map(q => q.vendor);

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200 dark:border-dark-700">
            <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Criteria</th>
            {vendors.map((vendor, index) => (
              <th key={index} className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3 min-w-[150px]">
                {vendor}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-dark-700">
          {items.map((item, index) => (
            <tr key={index}>
              <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-white">{item.name}</td>
              {vendors.map((vendor, vIndex) => {
                const price = item[vendor.toLowerCase().replace(/\s/g, '')];
                const isLowest = price === Math.min(...vendors.map(v => item[v.toLowerCase().replace(/\s/g, '')]));
                return (
                  <td key={vIndex} className={`px-4 py-3 text-sm text-center ${isLowest ? 'text-green-600 font-bold' : 'text-slate-600'}`}>
                    ${price}
                  </td>
                );
              })}
            </tr>
          ))}
          <tr className="bg-slate-50 dark:bg-dark-700/50 font-semibold">
            <td className="px-4 py-3 text-sm text-slate-900 dark:text-white">Total</td>
            {vendors.map((vendor, index) => (
              <td key={index} className="px-4 py-3 text-sm text-center text-slate-900 dark:text-white">
                ${quotations[index].amount.toLocaleString()}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;