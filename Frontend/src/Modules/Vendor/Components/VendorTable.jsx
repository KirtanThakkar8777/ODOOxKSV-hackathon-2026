export default function VendorTable({
  vendors,
  onView,
}) {
  return (
    <div className="bg-white rounded-xl border overflow-hidden">

      <table className="w-full">

        <thead>
          <tr className="border-b">
            <th>Name</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {vendors.map((vendor) => (
            <tr
              key={vendor._id}
              className="border-b"
            >
              <td>{vendor.companyName}</td>

              <td>
                {vendor.contactPerson}
              </td>

              <td>{vendor.email}</td>

              <td>{vendor.status}</td>

              <td>
                <button
                  onClick={() =>
                    onView(vendor)
                  }
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}