// ============================================================
// VendorBridge — Full React App with Dynamic Data Flow
// ============================================================
// Architecture:
//   services/mockApi.js   → simulated async API
//   context/AppContext    → global state (auth, notifications)
//   hooks/use*.js         → domain data hooks
//   components/ui/*       → reusable atoms
//   components/layout/*   → shell, sidebar, topbar
//   pages/*               → route-level page components
// All wired in <App> with React Router-like state-based routing
// ============================================================

import { useState, useEffect, useCallback, useContext, createContext, useReducer, useRef, useMemo } from "react";

// ─────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────
const MOCK_VENDORS = [
  { id: "v1", name: "Apex Supplies Co.", category: "Raw Materials", status: "Active", rating: 4.8, spend: 284000, contact: "Ravi Mehta", email: "ravi@apexsupplies.com", rfqs: 12, pos: 8 },
  { id: "v2", name: "TechParts Ltd.", category: "Electronics", status: "Active", rating: 4.5, spend: 195000, contact: "Priya Shah", email: "priya@techparts.com", rfqs: 9, pos: 6 },
  { id: "v3", name: "GlobalTrade Inc.", category: "Logistics", status: "Under Review", rating: 3.9, spend: 120000, contact: "Arjun Nair", email: "arjun@globaltrade.com", rfqs: 5, pos: 3 },
  { id: "v4", name: "SwiftLogistics", category: "Logistics", status: "Active", rating: 4.2, spend: 87000, contact: "Sneha Patel", email: "sneha@swiftlog.com", rfqs: 7, pos: 5 },
  { id: "v5", name: "BestBuild Corp.", category: "Construction", status: "Inactive", rating: 3.5, spend: 45000, contact: "Karan Singh", email: "karan@bestbuild.com", rfqs: 3, pos: 1 },
  { id: "v6", name: "Naveen Chemicals", category: "Raw Materials", status: "Active", rating: 4.6, spend: 310000, contact: "Naveen Rao", email: "naveen@nchem.com", rfqs: 14, pos: 10 },
];

const MOCK_RFQS = [
  { id: "RFQ-2401", title: "Office Furniture Q3", vendor: "Apex Supplies Co.", status: "Open", deadline: "2026-06-20", budget: 50000, responses: 3, createdAt: "2026-06-01" },
  { id: "RFQ-2402", title: "Server Hardware Upgrade", vendor: "TechParts Ltd.", status: "Closed", deadline: "2026-05-30", budget: 120000, responses: 5, createdAt: "2026-05-10" },
  { id: "RFQ-2403", title: "Packaging Materials", vendor: "GlobalTrade Inc.", status: "Draft", deadline: "2026-06-25", budget: 30000, responses: 0, createdAt: "2026-06-03" },
  { id: "RFQ-2404", title: "Fleet Maintenance Contract", vendor: "SwiftLogistics", status: "Open", deadline: "2026-06-18", budget: 75000, responses: 2, createdAt: "2026-06-02" },
  { id: "RFQ-2405", title: "Chemical Solvents Bulk", vendor: "Naveen Chemicals", status: "Awarded", deadline: "2026-05-15", budget: 90000, responses: 4, createdAt: "2026-04-28" },
];

const MOCK_POS = [
  { id: "PO-5501", vendor: "Apex Supplies Co.", item: "Steel Rods 500MT", amount: 84000, status: "Delivered", date: "2026-05-20", dueDate: "2026-06-01" },
  { id: "PO-5502", vendor: "TechParts Ltd.", item: "Server Rack x10", amount: 62000, status: "In Transit", date: "2026-05-28", dueDate: "2026-06-15" },
  { id: "PO-5503", vendor: "SwiftLogistics", item: "Freight Q2 North", amount: 28000, status: "Pending", date: "2026-06-01", dueDate: "2026-06-20" },
  { id: "PO-5504", vendor: "Naveen Chemicals", item: "Acetone 200L", amount: 19500, status: "Delivered", date: "2026-05-15", dueDate: "2026-05-25" },
  { id: "PO-5505", vendor: "GlobalTrade Inc.", item: "Packaging Boxes 10k", amount: 11000, status: "Cancelled", date: "2026-05-10", dueDate: "2026-05-30" },
];

const MOCK_APPROVALS = [
  { id: "APR-001", type: "Purchase Order", ref: "PO-5506", requester: "Amit Verma", amount: 95000, status: "Pending", priority: "High", submittedAt: "2026-06-05T10:30:00" },
  { id: "APR-002", type: "RFQ Award", ref: "RFQ-2405", requester: "Divya Kumar", amount: 90000, status: "Approved", priority: "Medium", submittedAt: "2026-06-04T14:00:00" },
  { id: "APR-003", type: "Vendor Onboarding", ref: "v7", requester: "Rahul Joshi", amount: 0, status: "Pending", priority: "Low", submittedAt: "2026-06-05T09:00:00" },
  { id: "APR-004", type: "Invoice Payment", ref: "INV-8821", requester: "Pooja Iyer", amount: 42000, status: "Rejected", priority: "High", submittedAt: "2026-06-03T16:45:00" },
  { id: "APR-005", type: "Purchase Order", ref: "PO-5507", requester: "Sanjay Gupta", amount: 37500, status: "Pending", priority: "Medium", submittedAt: "2026-06-06T08:15:00" },
];

const MOCK_INVOICES = [
  { id: "INV-8820", vendor: "Apex Supplies Co.", poRef: "PO-5501", amount: 84000, status: "Paid", dueDate: "2026-06-01", paidDate: "2026-05-30" },
  { id: "INV-8821", vendor: "TechParts Ltd.", poRef: "PO-5502", amount: 62000, status: "Overdue", dueDate: "2026-06-05", paidDate: null },
  { id: "INV-8822", vendor: "SwiftLogistics", poRef: "PO-5503", amount: 28000, status: "Pending", dueDate: "2026-06-25", paidDate: null },
  { id: "INV-8823", vendor: "Naveen Chemicals", poRef: "PO-5504", amount: 19500, status: "Paid", dueDate: "2026-05-25", paidDate: "2026-05-24" },
  { id: "INV-8824", vendor: "GlobalTrade Inc.", poRef: "PO-5505", amount: 11000, status: "Disputed", dueDate: "2026-06-10", paidDate: null },
];

const MOCK_ACTIVITY = [
  { id: "a1", action: "PO Created", detail: "PO-5507 created for SwiftLogistics", user: "Sanjay Gupta", time: "2026-06-06T08:15:00", type: "create" },
  { id: "a2", action: "Approval Submitted", detail: "APR-005 submitted for review", user: "Sanjay Gupta", time: "2026-06-06T08:16:00", type: "submit" },
  { id: "a3", action: "RFQ Awarded", detail: "RFQ-2405 awarded to Naveen Chemicals", user: "Divya Kumar", time: "2026-06-05T14:30:00", type: "award" },
  { id: "a4", action: "Invoice Disputed", detail: "INV-8824 disputed by Finance team", user: "Pooja Iyer", time: "2026-06-05T11:00:00", type: "dispute" },
  { id: "a5", action: "Vendor Reviewed", detail: "GlobalTrade Inc. status changed to Under Review", user: "Rahul Joshi", time: "2026-06-04T09:45:00", type: "update" },
  { id: "a6", action: "Approval Rejected", detail: "APR-004 rejected — budget exceeded", user: "Amit Verma", time: "2026-06-03T16:50:00", type: "reject" },
  { id: "a7", action: "PO Delivered", detail: "PO-5501 marked as delivered", user: "System", time: "2026-06-01T10:00:00", type: "update" },
];

const SPEND_DATA = [
  { month: "Jan", spend: 210000 }, { month: "Feb", spend: 185000 },
  { month: "Mar", spend: 245000 }, { month: "Apr", spend: 198000 },
  { month: "May", spend: 320000 }, { month: "Jun", spend: 284000 },
];

// ─────────────────────────────────────────────
// MOCK API SERVICE
// ─────────────────────────────────────────────
const delay = (ms = 400) => new Promise(r => setTimeout(r, ms));

const mockApi = {
  getVendors: async () => { await delay(); return [...MOCK_VENDORS]; },
  getRFQs: async () => { await delay(); return [...MOCK_RFQS]; },
  getPOs: async () => { await delay(); return [...MOCK_POS]; },
  getApprovals: async () => { await delay(); return [...MOCK_APPROVALS]; },
  getInvoices: async () => { await delay(); return [...MOCK_INVOICES]; },
  getActivity: async () => { await delay(); return [...MOCK_ACTIVITY]; },
  getSpendData: async () => { await delay(200); return [...SPEND_DATA]; },
  updateApprovalStatus: async (id, status) => { await delay(300); return { id, status }; },
  updateVendorStatus: async (id, status) => { await delay(300); return { id, status }; },
};

// ─────────────────────────────────────────────
// CONTEXTS
// ─────────────────────────────────────────────
const AuthContext = createContext(null);
const NotificationContext = createContext(null);
const AppDataContext = createContext(null);

function useAuth() { return useContext(AuthContext); }
function useNotifications() { return useContext(NotificationContext); }
function useAppData() { return useContext(AppDataContext); }

function NotificationProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const push = useCallback((msg, type = "success") => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);
  return (
    <NotificationContext.Provider value={{ push }}>
      {children}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000, display: "flex", flexDirection: "column", gap: 8 }}>
        {toasts.map(t => (
          <div key={t.id} style={{
            background: t.type === "success" ? "#1D9E75" : t.type === "error" ? "#E24B4A" : "#185FA5",
            color: "#fff", padding: "10px 16px", borderRadius: 8, fontSize: 13,
            fontWeight: 500, boxShadow: "0 4px 12px rgba(0,0,0,0.15)", minWidth: 220,
            animation: "slideIn 0.2s ease"
          }}>{t.msg}</div>
        ))}
      </div>
      <style>{`@keyframes slideIn { from { transform: translateX(40px); opacity:0 } to { transform: translateX(0); opacity:1 } }`}</style>
    </NotificationContext.Provider>
  );
}

function AppDataProvider({ children }) {
  const [vendors, setVendors] = useState([]);
  const [rfqs, setRfqs] = useState([]);
  const [pos, setPos] = useState([]);
  const [approvals, setApprovals] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [activity, setActivity] = useState([]);
  const [spendData, setSpendData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      mockApi.getVendors().then(setVendors),
      mockApi.getRFQs().then(setRfqs),
      mockApi.getPOs().then(setPos),
      mockApi.getApprovals().then(setApprovals),
      mockApi.getInvoices().then(setInvoices),
      mockApi.getActivity().then(setActivity),
      mockApi.getSpendData().then(setSpendData),
    ]).then(() => setLoading(false));
  }, []);

  const updateApproval = useCallback((id, status) => {
    setApprovals(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    setActivity(prev => [{
      id: "a" + Date.now(), action: `Approval ${status}`,
      detail: `${id} ${status.toLowerCase()} by you`, user: "You", time: new Date().toISOString(), type: status.toLowerCase()
    }, ...prev]);
  }, []);

  const updateVendor = useCallback((id, patch) => {
    setVendors(prev => prev.map(v => v.id === id ? { ...v, ...patch } : v));
  }, []);

  const stats = useMemo(() => ({
    totalSpend: vendors.reduce((s, v) => s + v.spend, 0),
    activeVendors: vendors.filter(v => v.status === "Active").length,
    openRFQs: rfqs.filter(r => r.status === "Open").length,
    pendingApprovals: approvals.filter(a => a.status === "Pending").length,
    overdueInvoices: invoices.filter(i => i.status === "Overdue").length,
    totalPOs: pos.length,
  }), [vendors, rfqs, approvals, invoices, pos]);

  return (
    <AppDataContext.Provider value={{ vendors, rfqs, pos, approvals, invoices, activity, spendData, stats, loading, updateApproval, updateVendor }}>
      {children}
    </AppDataContext.Provider>
  );
}

// ─────────────────────────────────────────────
// CUSTOM HOOKS
// ─────────────────────────────────────────────
function useDebounce(value, ms = 300) {
  const [dv, setDv] = useState(value);
  useEffect(() => { const t = setTimeout(() => setDv(value), ms); return () => clearTimeout(t); }, [value, ms]);
  return dv;
}

function usePagination(items, pageSize = 8) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(items.length / pageSize);
  const paged = items.slice((page - 1) * pageSize, page * pageSize);
  useEffect(() => { setPage(1); }, [items.length]);
  return { paged, page, setPage, totalPages };
}

function useTableFilter(items, fields) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const dSearch = useDebounce(search, 250);
  const filtered = useMemo(() => {
    let r = items;
    if (dSearch) r = r.filter(item => fields.some(f => String(item[f] || "").toLowerCase().includes(dSearch.toLowerCase())));
    Object.entries(filters).forEach(([k, v]) => { if (v && v !== "All") r = r.filter(item => String(item[k]) === v); });
    return r;
  }, [items, dSearch, filters, fields]);
  return { filtered, search, setSearch, filters, setFilters };
}

// ─────────────────────────────────────────────
// REUSABLE UI ATOMS
// ─────────────────────────────────────────────
const STATUS_COLORS = {
  Active: { bg: "#EAF3DE", color: "#3B6D11" },
  Inactive: { bg: "#F1EFE8", color: "#5F5E5A" },
  "Under Review": { bg: "#FAEEDA", color: "#854F0B" },
  Open: { bg: "#E6F1FB", color: "#185FA5" },
  Closed: { bg: "#F1EFE8", color: "#5F5E5A" },
  Draft: { bg: "#FBEAF0", color: "#993556" },
  Awarded: { bg: "#EAF3DE", color: "#3B6D11" },
  Pending: { bg: "#FAEEDA", color: "#854F0B" },
  Approved: { bg: "#EAF3DE", color: "#3B6D11" },
  Rejected: { bg: "#FCEBEB", color: "#A32D2D" },
  Paid: { bg: "#EAF3DE", color: "#3B6D11" },
  Overdue: { bg: "#FCEBEB", color: "#A32D2D" },
  Disputed: { bg: "#FAEEDA", color: "#854F0B" },
  Delivered: { bg: "#EAF3DE", color: "#3B6D11" },
  "In Transit": { bg: "#E6F1FB", color: "#185FA5" },
  Cancelled: { bg: "#FCEBEB", color: "#A32D2D" },
  High: { bg: "#FCEBEB", color: "#A32D2D" },
  Medium: { bg: "#FAEEDA", color: "#854F0B" },
  Low: { bg: "#EAF3DE", color: "#3B6D11" },
};

function StatusPill({ status }) {
  const s = STATUS_COLORS[status] || { bg: "#F1EFE8", color: "#5F5E5A" };
  return <span style={{ background: s.bg, color: s.color, fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 20, whiteSpace: "nowrap" }}>{status}</span>;
}

function StatCard({ label, value, sub, accent }) {
  return (
    <div style={{ background: "#fff", border: "0.5px solid #e5e5e5", borderRadius: 10, padding: "14px 16px", borderTop: `3px solid ${accent || "#185FA5"}` }}>
      <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: "#1a1a1a" }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function Btn({ children, onClick, variant = "primary", size = "md", disabled }) {
  const styles = {
    primary: { background: "#185FA5", color: "#fff", border: "none" },
    secondary: { background: "#fff", color: "#185FA5", border: "1px solid #185FA5" },
    ghost: { background: "transparent", color: "#555", border: "1px solid #ddd" },
    danger: { background: "#E24B4A", color: "#fff", border: "none" },
    success: { background: "#1D9E75", color: "#fff", border: "none" },
  };
  const sizes = { sm: { padding: "5px 12px", fontSize: 12 }, md: { padding: "8px 16px", fontSize: 13 } };
  return (
    <button onClick={onClick} disabled={disabled} style={{ ...styles[variant], ...sizes[size], borderRadius: 7, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, transition: "opacity 0.15s" }}>
      {children}
    </button>
  );
}

function SearchInput({ value, onChange, placeholder = "Search..." }) {
  return (
    <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
      <span style={{ position: "absolute", left: 10, color: "#aaa", fontSize: 14 }}>🔍</span>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ paddingLeft: 32, paddingRight: 10, paddingTop: 7, paddingBottom: 7, border: "1px solid #ddd", borderRadius: 7, fontSize: 13, outline: "none", width: 220, background: "#fafafa" }} />
    </div>
  );
}

function FilterSelect({ label, value, options, onChange }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      style={{ border: "1px solid #ddd", borderRadius: 7, padding: "7px 10px", fontSize: 12, color: "#555", background: "#fafafa", cursor: "pointer" }}>
      <option value="All">{label}: All</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

function Pagination({ page, totalPages, setPage }) {
  if (totalPages <= 1) return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end", marginTop: 12 }}>
      <Btn variant="ghost" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>←</Btn>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
        <button key={p} onClick={() => setPage(p)} style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid", borderColor: p === page ? "#185FA5" : "#ddd", background: p === page ? "#185FA5" : "#fff", color: p === page ? "#fff" : "#555", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>{p}</button>
      ))}
      <Btn variant="ghost" size="sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>→</Btn>
    </div>
  );
}

function DataTable({ columns, rows, emptyMsg = "No records found." }) {
  if (!rows.length) return <div style={{ textAlign: "center", padding: "40px 0", color: "#aaa", fontSize: 14 }}>{emptyMsg}</div>;
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #eee" }}>
            {columns.map(c => <th key={c.key} style={{ textAlign: "left", padding: "9px 12px", fontWeight: 600, color: "#666", fontSize: 12, whiteSpace: "nowrap" }}>{c.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id || i} style={{ borderBottom: "0.5px solid #f0f0f0", transition: "background 0.1s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
              onMouseLeave={e => e.currentTarget.style.background = ""}>
              {columns.map(c => <td key={c.key} style={{ padding: "10px 12px", color: "#333" }}>{c.render ? c.render(row[c.key], row) : row[c.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PageHeader({ title, subtitle, actions }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#1a1a1a", margin: 0 }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 13, color: "#888", marginTop: 3 }}>{subtitle}</p>}
      </div>
      {actions && <div style={{ display: "flex", gap: 8 }}>{actions}</div>}
    </div>
  );
}

function LoadingSkeleton({ rows = 5 }) {
  return (
    <div style={{ padding: "16px 0" }}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} style={{ height: 40, background: "linear-gradient(90deg,#f0f0f0 25%,#e8e8e8 50%,#f0f0f0 75%)", backgroundSize: "200% 100%", borderRadius: 6, marginBottom: 8, animation: "shimmer 1.4s infinite" }} />
      ))}
      <style>{`@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>
    </div>
  );
}

function Modal({ open, onClose, title, children, width = 520 }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onClose}>
      <div style={{ background: "#fff", borderRadius: 12, width, maxWidth: "95vw", maxHeight: "85vh", overflow: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #eee" }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#aaa" }}>×</button>
        </div>
        <div style={{ padding: 20 }}>{children}</div>
      </div>
    </div>
  );
}

function BarChartSVG({ data }) {
  const max = Math.max(...data.map(d => d.spend));
  const h = 120, w = 100;
  return (
    <svg viewBox={`0 0 ${data.length * w} ${h + 40}`} style={{ width: "100%", height: 160 }}>
      {data.map((d, i) => {
        const bh = (d.spend / max) * h;
        const x = i * w + 12;
        return (
          <g key={d.month}>
            <rect x={x} y={h - bh} width={w - 24} height={bh} rx={4} fill="#185FA5" opacity={0.85} />
            <text x={x + (w - 24) / 2} y={h + 16} textAnchor="middle" fontSize={11} fill="#888">{d.month}</text>
            <text x={x + (w - 24) / 2} y={h - bh - 5} textAnchor="middle" fontSize={10} fill="#555">{(d.spend / 1000).toFixed(0)}k</text>
          </g>
        );
      })}
    </svg>
  );
}

function DonutSVG({ segments }) {
  const total = segments.reduce((s, x) => s + x.value, 0);
  let angle = -90;
  const r = 50, cx = 70, cy = 60;
  const arcs = segments.map(s => {
    const sweep = (s.value / total) * 360;
    const start = angle; angle += sweep;
    const startRad = (start * Math.PI) / 180;
    const endRad = ((start + sweep) * Math.PI) / 180;
    const x1 = cx + r * Math.cos(startRad), y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad), y2 = cy + r * Math.sin(endRad);
    const lg = sweep > 180 ? 1 : 0;
    return { ...s, d: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${lg} 1 ${x2} ${y2} Z` };
  });
  const colors = ["#185FA5", "#1D9E75", "#BA7517", "#D85A30", "#993556"];
  return (
    <svg viewBox="0 0 220 120" style={{ width: "100%", maxWidth: 260 }}>
      {arcs.map((a, i) => <path key={a.label} d={a.d} fill={colors[i % colors.length]} opacity={0.88} />)}
      <circle cx={cx} cy={cy} r={28} fill="#fff" />
      {segments.map((s, i) => (
        <g key={s.label}>
          <rect x={130} y={14 + i * 18} width={10} height={10} rx={2} fill={colors[i % colors.length]} />
          <text x={145} y={23 + i * 18} fontSize={10} fill="#555">{s.label} ({((s.value / total) * 100).toFixed(0)}%)</text>
        </g>
      ))}
    </svg>
  );
}

// ─────────────────────────────────────────────
// LAYOUT
// ─────────────────────────────────────────────
const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: "📊" },
  { key: "vendors", label: "Vendors", icon: "🏢" },
  { key: "rfq", label: "RFQ Manager", icon: "📋" },
  { key: "quotes", label: "Quotes", icon: "💬" },
  { key: "pos", label: "Purchase Orders", icon: "📦" },
  { key: "approvals", label: "Approvals", icon: "✅" },
  { key: "invoices", label: "Invoices", icon: "🧾" },
  { key: "activity", label: "Activity Logs", icon: "📝" },
  { key: "reports", label: "Reports", icon: "📈" },
];

function Sidebar({ page, setPage }) {
  const { stats } = useAppData();
  return (
    <aside style={{ width: 220, background: "#0f1f3d", minHeight: "100vh", display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={{ padding: "20px 16px 12px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ fontSize: 17, fontWeight: 800, color: "#fff", letterSpacing: "-0.3px" }}>VendorBridge</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>Procurement Suite</div>
      </div>
      <nav style={{ padding: "12px 0", flex: 1 }}>
        {NAV_ITEMS.map(n => (
          <div key={n.key} onClick={() => setPage(n.key)}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 16px", cursor: "pointer", borderRadius: "0 20px 20px 0", marginRight: 12, marginBottom: 2, background: page === n.key ? "rgba(24,95,165,0.5)" : "transparent", borderLeft: page === n.key ? "3px solid #4da3ff" : "3px solid transparent", transition: "all 0.15s" }}
            onMouseEnter={e => { if (page !== n.key) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
            onMouseLeave={e => { if (page !== n.key) e.currentTarget.style.background = "transparent"; }}>
            <span style={{ fontSize: 15 }}>{n.icon}</span>
            <span style={{ fontSize: 13, color: page === n.key ? "#fff" : "rgba(255,255,255,0.65)", fontWeight: page === n.key ? 600 : 400 }}>{n.label}</span>
            {n.key === "approvals" && stats.pendingApprovals > 0 && (
              <span style={{ marginLeft: "auto", background: "#E24B4A", color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: 10, padding: "1px 6px" }}>{stats.pendingApprovals}</span>
            )}
          </div>
        ))}
      </nav>
      <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#185FA5", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 700 }}>AM</div>
          <div>
            <div style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>Amit Manager</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10 }}>Procurement Head</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function TopBar({ page }) {
  const { stats } = useAppData();
  const label = NAV_ITEMS.find(n => n.key === page)?.label || "Dashboard";
  return (
    <div style={{ height: 56, background: "#fff", borderBottom: "1px solid #eee", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", flexShrink: 0 }}>
      <div style={{ fontSize: 14, color: "#888" }}>
        <span style={{ color: "#185FA5", fontWeight: 600 }}>VendorBridge</span>
        <span style={{ margin: "0 6px" }}>/</span>
        <span>{label}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ position: "relative" }}>
          <span style={{ fontSize: 18, cursor: "pointer" }}>🔔</span>
          {stats.pendingApprovals > 0 && (
            <span style={{ position: "absolute", top: -4, right: -4, background: "#E24B4A", color: "#fff", fontSize: 9, fontWeight: 700, borderRadius: 10, padding: "1px 4px", lineHeight: 1.4 }}>{stats.pendingApprovals}</span>
          )}
        </div>
        <div style={{ fontSize: 12, color: "#555" }}>Q2 FY26</div>
      </div>
    </div>
  );
}

function AppShell({ page, setPage, children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f6f7fb", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <Sidebar page={page} setPage={setPage} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopBar page={page} />
        <main style={{ flex: 1, overflowY: "auto", padding: 24 }}>
          {children}
        </main>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// PAGES
// ─────────────────────────────────────────────

// DASHBOARD
function DashboardPage() {
  const { stats, vendors, spendData, rfqs, approvals, loading } = useAppData();
  if (loading) return <LoadingSkeleton rows={8} />;
  const topVendors = [...vendors].sort((a, b) => b.spend - a.spend).slice(0, 4);
  const donutData = [
    { label: "Raw Materials", value: vendors.filter(v => v.category === "Raw Materials").reduce((s, v) => s + v.spend, 0) },
    { label: "Electronics", value: vendors.filter(v => v.category === "Electronics").reduce((s, v) => s + v.spend, 0) },
    { label: "Logistics", value: vendors.filter(v => v.category === "Logistics").reduce((s, v) => s + v.spend, 0) },
    { label: "Construction", value: vendors.filter(v => v.category === "Construction").reduce((s, v) => s + v.spend, 0) },
  ];
  return (
    <div>
      <PageHeader title="Executive Dashboard" subtitle="Real-time procurement overview" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        <StatCard label="Total Spend (FY26)" value={`₹${(stats.totalSpend / 100000).toFixed(1)}L`} sub="vs ₹8.9L target" accent="#185FA5" />
        <StatCard label="Active Vendors" value={stats.activeVendors} sub={`of ${vendors.length} total`} accent="#1D9E75" />
        <StatCard label="Open RFQs" value={stats.openRFQs} sub="pending responses" accent="#BA7517" />
        <StatCard label="Pending Approvals" value={stats.pendingApprovals} sub="requires action" accent="#E24B4A" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 20, marginBottom: 20 }}>
        <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Monthly Spend Trend</div>
          <BarChartSVG data={spendData} />
        </div>
        <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Spend by Category</div>
          <DonutSVG segments={donutData} />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Top Vendors by Spend</div>
          {topVendors.map(v => (
            <div key={v.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: "0.5px solid #f0f0f0" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{v.name}</div>
                <div style={{ fontSize: 11, color: "#999" }}>{v.category}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#185FA5" }}>₹{(v.spend / 1000).toFixed(0)}k</div>
                <StatusPill status={v.status} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Recent Approvals</div>
          {approvals.slice(0, 4).map(a => (
            <div key={a.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: "0.5px solid #f0f0f0" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{a.type}</div>
                <div style={{ fontSize: 11, color: "#999" }}>{a.requester} · {a.ref}</div>
              </div>
              <StatusPill status={a.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// VENDORS
function VendorManagementPage() {
  const { vendors, updateVendor, loading } = useAppData();
  const { push } = useNotifications();
  const { filtered, search, setSearch, filters, setFilters } = useTableFilter(vendors, ["name", "category", "contact"]);
  const { paged, page, setPage, totalPages } = usePagination(filtered, 6);
  const [selected, setSelected] = useState(null);
  const cats = [...new Set(vendors.map(v => v.category))];

  const handleStatusChange = (id, status) => {
    updateVendor(id, { status });
    push(`Vendor status updated to ${status}`, "success");
    setSelected(null);
  };

  const cols = [
    { key: "name", label: "Vendor Name", render: (v, row) => <span style={{ fontWeight: 600, color: "#185FA5", cursor: "pointer" }} onClick={() => setSelected(row)}>{v}</span> },
    { key: "category", label: "Category" },
    { key: "contact", label: "Contact" },
    { key: "spend", label: "Total Spend", render: v => `₹${(v / 1000).toFixed(0)}k` },
    { key: "rating", label: "Rating", render: v => `⭐ ${v}` },
    { key: "status", label: "Status", render: v => <StatusPill status={v} /> },
    { key: "id", label: "", render: (_, row) => <Btn size="sm" variant="ghost" onClick={() => setSelected(row)}>View</Btn> },
  ];
  return (
    <div>
      <PageHeader title="Vendor Management" subtitle={`${vendors.length} vendors registered`} actions={[<Btn key="add">+ Add Vendor</Btn>]} />
      <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 10, padding: 20 }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
          <SearchInput value={search} onChange={setSearch} placeholder="Search vendors..." />
          <FilterSelect label="Category" value={filters.category || "All"} options={cats} onChange={v => setFilters(f => ({ ...f, category: v }))} />
          <FilterSelect label="Status" value={filters.status || "All"} options={["Active", "Inactive", "Under Review"]} onChange={v => setFilters(f => ({ ...f, status: v }))} />
          <span style={{ fontSize: 12, color: "#888", alignSelf: "center", marginLeft: "auto" }}>{filtered.length} results</span>
        </div>
        {loading ? <LoadingSkeleton /> : <DataTable columns={cols} rows={paged} />}
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name}>
        {selected && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              {[["Category", selected.category], ["Contact", selected.contact], ["Email", selected.email], ["Spend", `₹${(selected.spend / 1000).toFixed(0)}k`], ["RFQs", selected.rfqs], ["POs", selected.pos]].map(([k, v]) => (
                <div key={k} style={{ background: "#fafafa", borderRadius: 8, padding: "10px 12px" }}>
                  <div style={{ fontSize: 11, color: "#999" }}>{k}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <Btn variant="ghost" onClick={() => { handleStatusChange(selected.id, selected.status === "Active" ? "Inactive" : "Active"); }}>
                {selected.status === "Active" ? "Deactivate" : "Activate"}
              </Btn>
              <Btn variant="secondary" onClick={() => push("Vendor profile saved", "success")}>Save Changes</Btn>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// RFQ
function RFQManagerPage() {
  const { rfqs, loading } = useAppData();
  const { push } = useNotifications();
  const { filtered, search, setSearch, filters, setFilters } = useTableFilter(rfqs, ["id", "title", "vendor"]);
  const { paged, page, setPage, totalPages } = usePagination(filtered, 6);
  const cols = [
    { key: "id", label: "RFQ ID", render: v => <span style={{ fontFamily: "monospace", fontWeight: 700, color: "#185FA5" }}>{v}</span> },
    { key: "title", label: "Title", render: v => <span style={{ fontWeight: 600 }}>{v}</span> },
    { key: "vendor", label: "Vendor" },
    { key: "budget", label: "Budget", render: v => `₹${(v / 1000).toFixed(0)}k` },
    { key: "responses", label: "Responses", render: v => <span style={{ background: "#E6F1FB", color: "#185FA5", borderRadius: 12, padding: "2px 8px", fontSize: 12, fontWeight: 700 }}>{v}</span> },
    { key: "deadline", label: "Deadline" },
    { key: "status", label: "Status", render: v => <StatusPill status={v} /> },
    { key: "id", label: "", render: () => <Btn size="sm" variant="ghost" onClick={() => push("Opening RFQ details...", "info")}>View</Btn> },
  ];
  return (
    <div>
      <PageHeader title="RFQ Manager" subtitle="Request for Quotation tracking" actions={[<Btn key="new" onClick={() => push("New RFQ form opened")}>+ New RFQ</Btn>]} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
        {[["Total RFQs", rfqs.length, "#185FA5"], ["Open", rfqs.filter(r => r.status === "Open").length, "#1D9E75"], ["Awarded", rfqs.filter(r => r.status === "Awarded").length, "#BA7517"], ["Draft", rfqs.filter(r => r.status === "Draft").length, "#888"]].map(([l, v, c]) => (
          <StatCard key={l} label={l} value={v} accent={c} />
        ))}
      </div>
      <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 10, padding: 20 }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
          <SearchInput value={search} onChange={setSearch} placeholder="Search RFQs..." />
          <FilterSelect label="Status" value={filters.status || "All"} options={["Open", "Closed", "Draft", "Awarded"]} onChange={v => setFilters(f => ({ ...f, status: v }))} />
          <span style={{ fontSize: 12, color: "#888", alignSelf: "center", marginLeft: "auto" }}>{filtered.length} results</span>
        </div>
        {loading ? <LoadingSkeleton /> : <DataTable columns={cols} rows={paged} />}
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </div>
  );
}

// QUOTES
function QuoteManagementPage() {
  const { rfqs, vendors, loading } = useAppData();
  const awarded = rfqs.filter(r => r.status === "Awarded" || r.status === "Closed");
  const totalQuoteValue = awarded.reduce((s, r) => s + r.budget, 0);
  return (
    <div>
      <PageHeader title="Quote Management" subtitle="Awarded and closed RFQ comparisons" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 20 }}>
        <StatCard label="Awarded Quotes" value={rfqs.filter(r => r.status === "Awarded").length} accent="#1D9E75" />
        <StatCard label="Total Quote Value" value={`₹${(totalQuoteValue / 100000).toFixed(1)}L`} accent="#185FA5" />
        <StatCard label="Avg Responses/RFQ" value={(rfqs.reduce((s, r) => s + r.responses, 0) / rfqs.length).toFixed(1)} accent="#BA7517" />
      </div>
      <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 10, padding: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Executive Quote Summary</div>
        {loading ? <LoadingSkeleton /> : (
          <DataTable columns={[
            { key: "id", label: "RFQ ID", render: v => <span style={{ fontFamily: "monospace", color: "#185FA5", fontWeight: 700 }}>{v}</span> },
            { key: "title", label: "Description" },
            { key: "vendor", label: "Awarded To" },
            { key: "budget", label: "Contract Value", render: v => `₹${(v / 1000).toFixed(0)}k` },
            { key: "responses", label: "Bids Received" },
            { key: "status", label: "Status", render: v => <StatusPill status={v} /> },
          ]} rows={awarded} />
        )}
      </div>
    </div>
  );
}

// PURCHASE ORDERS
function PurchaseOrdersPage() {
  const { pos, vendors, loading } = useAppData();
  const { push } = useNotifications();
  const { filtered, search, setSearch, filters, setFilters } = useTableFilter(pos, ["id", "vendor", "item"]);
  const { paged, page, setPage, totalPages } = usePagination(filtered, 6);
  const donutData = ["Delivered", "In Transit", "Pending", "Cancelled"].map(s => ({
    label: s, value: pos.filter(p => p.status === s).length || 0.1
  }));
  const cols = [
    { key: "id", label: "PO Number", render: v => <span style={{ fontFamily: "monospace", color: "#185FA5", fontWeight: 700 }}>{v}</span> },
    { key: "vendor", label: "Vendor" },
    { key: "item", label: "Item" },
    { key: "amount", label: "Amount", render: v => `₹${(v / 1000).toFixed(1)}k` },
    { key: "date", label: "Created" },
    { key: "dueDate", label: "Due Date" },
    { key: "status", label: "Status", render: v => <StatusPill status={v} /> },
  ];
  return (
    <div>
      <PageHeader title="Purchase Orders" subtitle={`${pos.length} orders total`} actions={[<Btn key="new" onClick={() => push("New PO form opened")}>+ New PO</Btn>]} />
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
          {["Delivered", "In Transit", "Pending", "Cancelled"].map((s, i) => (
            <StatCard key={s} label={s} value={pos.filter(p => p.status === s).length} accent={["#1D9E75", "#185FA5", "#BA7517", "#E24B4A"][i]} />
          ))}
        </div>
        <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 10, padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Order Breakdown</div>
          <DonutSVG segments={donutData} />
        </div>
      </div>
      <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 10, padding: 20 }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
          <SearchInput value={search} onChange={setSearch} placeholder="Search orders..." />
          <FilterSelect label="Status" value={filters.status || "All"} options={["Delivered", "In Transit", "Pending", "Cancelled"]} onChange={v => setFilters(f => ({ ...f, status: v }))} />
          <span style={{ fontSize: 12, color: "#888", alignSelf: "center", marginLeft: "auto" }}>{filtered.length} orders</span>
        </div>
        {loading ? <LoadingSkeleton /> : <DataTable columns={cols} rows={paged} />}
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </div>
  );
}

// APPROVALS
function ApprovalsPage() {
  const { approvals, updateApproval, loading } = useAppData();
  const { push } = useNotifications();
  const { filtered, search, setSearch, filters, setFilters } = useTableFilter(approvals, ["id", "type", "requester", "ref"]);
  const { paged, page, setPage, totalPages } = usePagination(filtered, 6);
  const [confirm, setConfirm] = useState(null);

  const handleAction = (id, status) => {
    updateApproval(id, status);
    push(`Approval ${status.toLowerCase()} successfully`, status === "Approved" ? "success" : "error");
    setConfirm(null);
  };

  const cols = [
    { key: "id", label: "ID", render: v => <span style={{ fontFamily: "monospace", fontSize: 11, color: "#888" }}>{v}</span> },
    { key: "type", label: "Type", render: v => <span style={{ fontWeight: 600 }}>{v}</span> },
    { key: "ref", label: "Reference", render: v => <span style={{ fontFamily: "monospace", color: "#185FA5" }}>{v}</span> },
    { key: "requester", label: "Requester" },
    { key: "amount", label: "Amount", render: v => v ? `₹${(v / 1000).toFixed(0)}k` : "—" },
    { key: "priority", label: "Priority", render: v => <StatusPill status={v} /> },
    { key: "status", label: "Status", render: v => <StatusPill status={v} /> },
    { key: "id", label: "Actions", render: (id, row) => row.status === "Pending" ? (
      <div style={{ display: "flex", gap: 6 }}>
        <Btn size="sm" variant="success" onClick={() => setConfirm({ id, action: "Approved" })}>✓</Btn>
        <Btn size="sm" variant="danger" onClick={() => setConfirm({ id, action: "Rejected" })}>✗</Btn>
      </div>
    ) : <span style={{ color: "#bbb", fontSize: 12 }}>—</span> },
  ];
  return (
    <div>
      <PageHeader title="Approval Activities" subtitle="Review and action pending approvals" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
        {[["Pending", "#BA7517"], ["Approved", "#1D9E75"], ["Rejected", "#E24B4A"], ["Total", "#185FA5"]].map(([s, c]) => (
          <StatCard key={s} label={s} value={s === "Total" ? approvals.length : approvals.filter(a => a.status === s).length} accent={c} />
        ))}
      </div>
      <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 10, padding: 20 }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
          <SearchInput value={search} onChange={setSearch} placeholder="Search approvals..." />
          <FilterSelect label="Status" value={filters.status || "All"} options={["Pending", "Approved", "Rejected"]} onChange={v => setFilters(f => ({ ...f, status: v }))} />
          <FilterSelect label="Priority" value={filters.priority || "All"} options={["High", "Medium", "Low"]} onChange={v => setFilters(f => ({ ...f, priority: v }))} />
          <span style={{ fontSize: 12, color: "#888", alignSelf: "center", marginLeft: "auto" }}>{filtered.length} items</span>
        </div>
        {loading ? <LoadingSkeleton /> : <DataTable columns={cols} rows={paged} />}
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
      <Modal open={!!confirm} onClose={() => setConfirm(null)} title={`Confirm ${confirm?.action}`} width={380}>
        {confirm && (
          <div>
            <p style={{ fontSize: 14, color: "#555", marginBottom: 20 }}>Are you sure you want to <strong>{confirm.action.toLowerCase()}</strong> approval <strong>{confirm.id}</strong>?</p>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <Btn variant="ghost" onClick={() => setConfirm(null)}>Cancel</Btn>
              <Btn variant={confirm.action === "Approved" ? "success" : "danger"} onClick={() => handleAction(confirm.id, confirm.action)}>
                Confirm {confirm.action}
              </Btn>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// INVOICES
function InvoicePaymentsPage() {
  const { invoices, loading } = useAppData();
  const { push } = useNotifications();
  const { filtered, search, setSearch, filters, setFilters } = useTableFilter(invoices, ["id", "vendor", "poRef"]);
  const { paged, page, setPage, totalPages } = usePagination(filtered, 6);
  const totalOutstanding = invoices.filter(i => i.status !== "Paid").reduce((s, i) => s + i.amount, 0);
  const cols = [
    { key: "id", label: "Invoice ID", render: v => <span style={{ fontFamily: "monospace", color: "#185FA5", fontWeight: 700 }}>{v}</span> },
    { key: "vendor", label: "Vendor" },
    { key: "poRef", label: "PO Ref", render: v => <span style={{ fontFamily: "monospace", color: "#888" }}>{v}</span> },
    { key: "amount", label: "Amount", render: v => `₹${(v / 1000).toFixed(1)}k` },
    { key: "dueDate", label: "Due Date" },
    { key: "paidDate", label: "Paid Date", render: v => v || "—" },
    { key: "status", label: "Status", render: v => <StatusPill status={v} /> },
    { key: "id", label: "", render: (_, row) => row.status === "Pending" ? <Btn size="sm" variant="primary" onClick={() => push(`Payment initiated for ${row.id}`, "success")}>Pay Now</Btn> : null },
  ];
  return (
    <div>
      <PageHeader title="Invoice & Payments" subtitle="Track invoices and payment schedules" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
        <StatCard label="Total Outstanding" value={`₹${(totalOutstanding / 1000).toFixed(0)}k`} accent="#E24B4A" />
        <StatCard label="Overdue" value={invoices.filter(i => i.status === "Overdue").length} accent="#E24B4A" />
        <StatCard label="Paid This Month" value={invoices.filter(i => i.status === "Paid").length} accent="#1D9E75" />
        <StatCard label="Disputed" value={invoices.filter(i => i.status === "Disputed").length} accent="#BA7517" />
      </div>
      <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 10, padding: 20 }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
          <SearchInput value={search} onChange={setSearch} placeholder="Search invoices..." />
          <FilterSelect label="Status" value={filters.status || "All"} options={["Paid", "Pending", "Overdue", "Disputed"]} onChange={v => setFilters(f => ({ ...f, status: v }))} />
          <span style={{ fontSize: 12, color: "#888", alignSelf: "center", marginLeft: "auto" }}>{filtered.length} invoices</span>
        </div>
        {loading ? <LoadingSkeleton /> : <DataTable columns={cols} rows={paged} />}
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </div>
  );
}

// ACTIVITY LOGS
function ActivityLogsPage() {
  const { activity, loading } = useAppData();
  const TYPE_COLORS = { create: "#1D9E75", submit: "#185FA5", award: "#BA7517", dispute: "#E24B4A", update: "#888", reject: "#E24B4A" };
  const TYPE_ICONS = { create: "➕", submit: "📤", award: "🏆", dispute: "⚠️", update: "✏️", reject: "❌" };
  return (
    <div>
      <PageHeader title="Activity Logs & Audit Trail" subtitle={`${activity.length} events recorded`} />
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Event Timeline</div>
          {loading ? <LoadingSkeleton rows={6} /> : (
            <div>
              {activity.map((a, i) => (
                <div key={a.id} style={{ display: "flex", gap: 14, paddingBottom: 16, position: "relative" }}>
                  {i < activity.length - 1 && <div style={{ position: "absolute", left: 17, top: 36, bottom: 0, width: 2, background: "#f0f0f0" }} />}
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: TYPE_COLORS[a.type] + "22", border: `2px solid ${TYPE_COLORS[a.type]}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 14 }}>{TYPE_ICONS[a.type]}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <span style={{ fontWeight: 700, fontSize: 13 }}>{a.action}</span>
                      <span style={{ fontSize: 11, color: "#aaa" }}>{new Date(a.time).toLocaleString()}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>{a.detail}</div>
                    <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>by {a.user}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Activity Summary</div>
            {Object.entries(TYPE_ICONS).map(([type, icon]) => (
              <div key={type} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 0", borderBottom: "0.5px solid #f5f5f5" }}>
                <span style={{ fontSize: 13 }}>{icon} {type.charAt(0).toUpperCase() + type.slice(1)}</span>
                <span style={{ fontWeight: 700, color: TYPE_COLORS[type], fontSize: 14 }}>{activity.filter(a => a.type === type).length}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Top Actors</div>
            {[...new Set(activity.map(a => a.user))].map(u => (
              <div key={u} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 0", borderBottom: "0.5px solid #f5f5f5" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#E6F1FB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#185FA5" }}>{u.substring(0, 2).toUpperCase()}</div>
                  <span style={{ fontSize: 13 }}>{u}</span>
                </div>
                <span style={{ fontWeight: 700, fontSize: 13, color: "#185FA5" }}>{activity.filter(a => a.user === u).length}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// REPORTS
function ReportsAnalyticsPage() {
  const { vendors, pos, invoices, rfqs, spendData, loading } = useAppData();
  const vendorPerf = vendors.map(v => ({
    ...v,
    poCount: pos.filter(p => p.vendor === v.name).length,
    paidInvoices: invoices.filter(i => i.vendor === v.name && i.status === "Paid").length,
  }));
  return (
    <div>
      <PageHeader title="Reports & Analytics" subtitle="Procurement performance insights" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
        <StatCard label="Total Procurement" value={`₹${(vendors.reduce((s, v) => s + v.spend, 0) / 100000).toFixed(1)}L`} accent="#185FA5" />
        <StatCard label="Cost Savings Est." value="₹4.2L" sub="vs market rate" accent="#1D9E75" />
        <StatCard label="On-time Delivery" value="84%" sub="industry avg: 76%" accent="#BA7517" />
        <StatCard label="Vendor Compliance" value="91%" sub="above target" accent="#1D9E75" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 20, marginBottom: 20 }}>
        <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Spend Trend (6 months)</div>
          <div style={{ fontSize: 12, color: "#888", marginBottom: 12 }}>Monthly procurement spend in ₹</div>
          <BarChartSVG data={spendData} />
        </div>
        <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Category Distribution</div>
          <DonutSVG segments={[
            { label: "Raw Materials", value: 594000 },
            { label: "Electronics", value: 195000 },
            { label: "Logistics", value: 207000 },
            { label: "Construction", value: 45000 },
          ]} />
        </div>
      </div>
      <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 10, padding: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Vendor Performance Matrix</div>
        {loading ? <LoadingSkeleton /> : (
          <DataTable columns={[
            { key: "name", label: "Vendor", render: v => <span style={{ fontWeight: 600 }}>{v}</span> },
            { key: "category", label: "Category" },
            { key: "spend", label: "Spend", render: v => `₹${(v / 1000).toFixed(0)}k` },
            { key: "rating", label: "Rating", render: v => <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ height: 6, borderRadius: 3, background: "#eee", width: 60, position: "relative" }}>
                <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${(v / 5) * 100}%`, background: v >= 4.5 ? "#1D9E75" : v >= 4 ? "#185FA5" : "#BA7517", borderRadius: 3 }} />
              </div>
              <span style={{ fontSize: 12 }}>{v}</span>
            </div> },
            { key: "poCount", label: "POs" },
            { key: "status", label: "Status", render: v => <StatusPill status={v} /> },
          ]} rows={vendorPerf} />
        )}
      </div>
    </div>
  );
}

// LOGIN PAGE
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("admin@vendorbridge.com");
  const [pass, setPass] = useState("password");
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    setLoading(true);
    await delay(800);
    setLoading(false);
    onLogin({ name: "Amit Manager", email, role: "Procurement Head" });
  };
  return (
    <div style={{ minHeight: "100vh", background: "#0f1f3d", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: 16, padding: "40px 36px", width: 380, boxShadow: "0 30px 80px rgba(0,0,0,0.4)" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: "#0f1f3d" }}>VendorBridge</div>
          <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>Procurement Management Suite</div>
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 6 }}>Email Address</label>
          <input value={email} onChange={e => setEmail(e.target.value)} style={{ width: "100%", padding: "10px 14px", border: "1px solid #ddd", borderRadius: 8, fontSize: 13, boxSizing: "border-box", outline: "none" }} />
        </div>
        <div style={{ marginBottom: 22 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 6 }}>Password</label>
          <input type="password" value={pass} onChange={e => setPass(e.target.value)} style={{ width: "100%", padding: "10px 14px", border: "1px solid #ddd", borderRadius: 8, fontSize: 13, boxSizing: "border-box", outline: "none" }} />
        </div>
        <button onClick={handleLogin} disabled={loading} style={{ width: "100%", padding: "12px", background: "#185FA5", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer", opacity: loading ? 0.7 : 1 }}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
        <div style={{ textAlign: "center", marginTop: 16, fontSize: 12, color: "#aaa" }}>Demo credentials pre-filled ↑</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────
const PAGE_MAP = {
  dashboard: DashboardPage,
  vendors: VendorManagementPage,
  rfq: RFQManagerPage,
  quotes: QuoteManagementPage,
  pos: PurchaseOrdersPage,
  approvals: ApprovalsPage,
  invoices: InvoicePaymentsPage,
  activity: ActivityLogsPage,
  reports: ReportsAnalyticsPage,
};

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("dashboard");

  if (!user) return (
    <NotificationProvider>
      <LoginPage onLogin={setUser} />
    </NotificationProvider>
  );

  const PageComponent = PAGE_MAP[page] || DashboardPage;

  return (
    <NotificationProvider>
      <AppDataProvider>
        <AuthContext.Provider value={{ user, logout: () => setUser(null) }}>
          <AppShell page={page} setPage={setPage}>
            <PageComponent />
          </AppShell>
        </AuthContext.Provider>
      </AppDataProvider>
    </NotificationProvider>
  );
}