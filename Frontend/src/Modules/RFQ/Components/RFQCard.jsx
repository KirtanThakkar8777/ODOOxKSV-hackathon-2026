import StatusBadge from "../../../components/common/StatusBadge";

const RFQCard = ({ rfq }) => {
  return (
    <div
      className="
      bg-white
      rounded-xl
      p-5
      border
      border-slate-200
      "
    >
      <h3 className="font-semibold">
        {rfq.title}
      </h3>

      <p className="text-slate-500 mt-2">
        {rfq.description}
      </p>

      <div className="mt-4">
        <StatusBadge
          status={rfq.status}
        />
      </div>
    </div>
  );
};

export default RFQCard;