import DashboardLayout from "../Layouts/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-4">

        <div className="bg-white p-5 rounded-xl border">
          <p>Total Vendors</p>
          <h2 className="text-3xl font-bold">
            125
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl border">
          <p>Active RFQ</p>
          <h2 className="text-3xl font-bold">
            25
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl border">
          <p>Quotations</p>
          <h2 className="text-3xl font-bold">
            42
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl border">
          <p>Purchase Orders</p>
          <h2 className="text-3xl font-bold">
            18
          </h2>
        </div>

      </div>

    </DashboardLayout>
  );
}