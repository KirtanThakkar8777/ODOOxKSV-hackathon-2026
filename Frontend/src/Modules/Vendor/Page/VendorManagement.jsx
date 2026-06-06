import { useEffect } from "react";

import DashboardLayout from "@/layouts/DashboardLayout";

import VendorStats from "../components/VendorStats";
import VendorTable from "../components/VendorTable";
import VendorDrawer from "../components/VendorDrawer";

import {
  getVendors,
} from "../services/vendor.service";

import useVendorStore from "../store/vendorStore";

export default function VendorManagement() {
  const {
    vendors,
    selectedVendor,
    setSelectedVendor,
    setVendors,
  } = useVendorStore();

  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors = async () => {
    const response =
      await getVendors();

    setVendors(response.data);
  };

  return (
    <DashboardLayout>

      <div className="space-y-6">

        <h1 className="text-3xl font-bold">
          Vendor Management
        </h1>

        <VendorStats
          total={vendors.length}
          active={
            vendors.filter(
              (v) => v.status === "Active"
            ).length
          }
          inactive={
            vendors.filter(
              (v) =>
                v.status === "Inactive"
            ).length
          }
        />

        <VendorTable
          vendors={vendors}
          onView={setSelectedVendor}
        />

        <VendorDrawer
          vendor={selectedVendor}
          onClose={() =>
            setSelectedVendor(null)
          }
        />

      </div>

    </DashboardLayout>
  );
}