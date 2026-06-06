    import StatusBadge from "../../../components/common/StatusBadge";

const VendorCard = ({ vendor }) => {
  return (
    <div
      className="
      bg-white
      p-5
      rounded-xl
      border
      border-slate-200
      shadow-sm
      "
    >
      <h3 className="font-semibold text-lg">
        {vendor.companyName}
      </h3>

      <p className="text-slate-500 mt-1">
        {vendor.contactPerson}
      </p>

      <p className="text-sm mt-2">
        {vendor.email}
      </p>

      <p className="text-sm">
        {vendor.phone}
      </p>

      <div className="mt-4">
        <StatusBadge
          status={vendor.status}
        />
      </div>
    </div>
  );
};

export default VendorCard;