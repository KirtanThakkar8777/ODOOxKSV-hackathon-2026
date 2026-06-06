export default function VendorStats({
  total,
  active,
  inactive,
}) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white p-5 rounded-xl border">
        <p>Total Vendors</p>
        <h2>{total}</h2>
      </div>

      <div className="bg-white p-5 rounded-xl border">
        <p>Active Vendors</p>
        <h2>{active}</h2>
      </div>

      <div className="bg-white p-5 rounded-xl border">
        <p>Inactive Vendors</p>
        <h2>{inactive}</h2>
      </div>
    </div>
  );
}