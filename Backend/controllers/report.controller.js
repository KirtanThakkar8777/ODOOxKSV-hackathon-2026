import Vendor from '../models/vendor.js';
import RFQ from '../models/RFQ.js';
import Quotation from '../models/Quotation.js';
import PurchaseOrder from '../models/PurchaseOrder.js';
import Invoice from '../models/Invoice.js';

const monthKey = (date) =>
  new Date(date).toLocaleString('en-US', { month: 'short' });

export const getDashboardReport = async (req, res, next) => {
  try {
    const [vendors, rfqs, quotations, orders, invoices] = await Promise.all([
      Vendor.find(),
      RFQ.find(),
      Quotation.find(),
      PurchaseOrder.find().populate('vendor', 'name'),
      Invoice.find(),
    ]);

    const totalSpend = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    const monthlySpend = orders.reduce((acc, order) => {
      const key = monthKey(order.createdAt);
      acc[key] = (acc[key] || 0) + (order.totalAmount || 0);
      return acc;
    }, {});

    res.json({
      stats: {
        totalVendors: vendors.length,
        activeVendors: vendors.filter((vendor) => vendor.status === 'active').length,
        activeRFQs: rfqs.filter((rfq) => rfq.status === 'open').length,
        quotations: quotations.length,
        purchaseOrders: orders.length,
        invoices: invoices.length,
        totalSpend,
      },
      spendTrend: Object.entries(monthlySpend).map(([name, spend]) => ({ name, spend })),
    });
  } catch (err) { next(err); }
};

export const getProcurementReport = async (req, res, next) => {
  try {
    const [rfqs, quotations, orders, invoices] = await Promise.all([
      RFQ.find(),
      Quotation.find(),
      PurchaseOrder.find(),
      Invoice.find(),
    ]);

    res.json({
      rfqs,
      quotations,
      orders,
      invoices,
      summary: {
        rfqs: rfqs.length,
        quotations: quotations.length,
        orders: orders.length,
        invoices: invoices.length,
      },
    });
  } catch (err) { next(err); }
};

export const getVendorReport = async (req, res, next) => {
  try {
    const orders = await PurchaseOrder.find().populate('vendor', 'name email status');
    const vendors = await Vendor.find();

    const spendByVendor = orders.reduce((acc, order) => {
      const id = order.vendor?._id?.toString() || 'unknown';
      const existing = acc[id] || {
        vendor: order.vendor || null,
        orders: 0,
        spend: 0,
      };
      existing.orders += 1;
      existing.spend += order.totalAmount || 0;
      acc[id] = existing;
      return acc;
    }, {});

    res.json({
      vendors,
      topVendors: Object.values(spendByVendor).sort((a, b) => b.spend - a.spend),
    });
  } catch (err) { next(err); }
};

export const getSpendReport = async (req, res, next) => {
  try {
    const orders = await PurchaseOrder.find().populate('vendor', 'name category');
    const totalSpend = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    res.json({
      totalSpend,
      orders,
      byMonth: orders.reduce((acc, order) => {
        const key = monthKey(order.createdAt);
        acc[key] = (acc[key] || 0) + (order.totalAmount || 0);
        return acc;
      }, {}),
    });
  } catch (err) { next(err); }
};

export const exportReport = async (req, res, next) => {
  try {
    res.json({
      message: `${req.params.type} report export is ready`,
      type: req.params.type,
      generatedAt: new Date().toISOString(),
    });
  } catch (err) { next(err); }
};
