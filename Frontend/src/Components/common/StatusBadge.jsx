const StatusBadge = ({ status }) => {
  const colors = {
    Active: "bg-green-100 text-green-700",
    Approved: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Rejected: "bg-red-100 text-red-700",
    Draft: "bg-slate-100 text-slate-700",
    Closed: "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`
      px-3
      py-1
      rounded-full
      text-xs
      font-medium
      ${colors[status] || colors.Draft}
      `}
    >
      {status}
    </span>
  );
};

export default StatusBadge;