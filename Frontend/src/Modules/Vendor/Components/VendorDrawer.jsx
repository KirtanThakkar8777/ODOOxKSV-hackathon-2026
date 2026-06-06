export default function VendorDrawer({
  vendor,
  onClose,
}) {
  if (!vendor) return null;

  return (
    <div className="fixed right-0 top-0 w-96 h-screen bg-white border-l p-5">

      <div className="flex justify-between">
        <h2>Vendor Details</h2>

        <button onClick={onClose}>
          X
        </button>
      </div>

      <div className="mt-5 space-y-3">

        <p>
          <strong>Name:</strong>{" "}
          {vendor.companyName}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {vendor.email}
        </p>

        <p>
          <strong>Phone:</strong>{" "}
          {vendor.phone}
        </p>

        <p>
          <strong>GST:</strong>{" "}
          {vendor.gstNumber}
        </p>

      </div>
    </div>
  );
}