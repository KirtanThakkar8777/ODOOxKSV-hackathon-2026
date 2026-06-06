import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "@/layouts/DashboardLayout";

import VendorForm from "../components/VendorForm";

import {
  getVendorById,
  updateVendor,
} from "../services/vendor.service";

export default function EditVendor() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [vendor, setVendor] =
    useState(null);

  useEffect(() => {
    loadVendor();
  }, []);

  const loadVendor = async () => {
    const response =
      await getVendorById(id);

    setVendor(response.data);
  };

  const handleSubmit = async (
    formData
  ) => {
    await updateVendor(id, formData);

    navigate("/vendors");
  };

  if (!vendor) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl border">

        <h1 className="text-2xl font-bold mb-6">
          Edit Vendor
        </h1>

        <VendorForm
          defaultValues={vendor}
          onSubmit={handleSubmit}
        />

      </div>
    </DashboardLayout>
  );
}