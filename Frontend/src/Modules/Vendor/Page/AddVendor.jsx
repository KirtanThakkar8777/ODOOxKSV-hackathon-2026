import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";

import VendorForm from "../components/VendorForm";
import { createVendor } from "../services/vendor.service";

export default function AddVendor() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await createVendor({
        ...data,
        status: "Active",
      });

      navigate("/vendors");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl border">
        <h1 className="text-2xl font-bold mb-6">
          Add Vendor
        </h1>

        <VendorForm
          onSubmit={handleSubmit}
        />
      </div>
    </DashboardLayout>
  );
}