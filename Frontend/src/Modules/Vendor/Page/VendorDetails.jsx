import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "@/layouts/DashboardLayout";

import {
  getVendorById,
} from "../services/vendor.service";

export default function VendorDetails() {
  const { id } = useParams();

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

  if (!vendor) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-xl border">

        <h1 className="text-3xl font-bold">
          {vendor.companyName}
        </h1>

        <div className="grid grid-cols-2 gap-6 mt-6">

          <div>
            <label>Email</label>
            <p>{vendor.email}</p>
          </div>

          <div>
            <label>Phone</label>
            <p>{vendor.phone}</p>
          </div>

          <div>
            <label>GST Number</label>
            <p>{vendor.gstNumber}</p>
          </div>

          <div>
            <label>Status</label>
            <p>{vendor.status}</p>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}