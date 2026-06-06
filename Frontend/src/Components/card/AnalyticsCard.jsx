const AnalyticsCard = ({
  title,
  children,
}) => {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      border
      border-slate-200
      p-5
      shadow-sm
      "
    >
      <div className="mb-5">
        <h3
          className="
          font-semibold
          text-lg
          "
        >
          {title}
        </h3>
      </div>

      {children}
    </div>
  );
};

export default AnalyticsCard;