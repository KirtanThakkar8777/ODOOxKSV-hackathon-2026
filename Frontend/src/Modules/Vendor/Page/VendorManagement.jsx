import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../../components/layout/Header";
import Button from "../../../components/common/Button";

import VendorTable from "../components/VendorTable";
import useVendor from "../hooks/useVendor";

const VendorManagement = () => {
  const navigate = useNavigate();

  const {
    vendors,
    getVendors,
  } = useVendor();

  useEffect(() => {
    getVendors();
  }, []);

  return (
    <div>
      <Header
        title="Vendor Management"
        subtitle="Manage vendor onboarding and approvals"
      />

      <div className="mb-4">
        <Button
          onClick={() =>
            navigate("/vendors/add")
          }
        >
          Add Vendor
        </Button>
      </div>

      <VendorTable vendors={vendors} />
    </div>
  );
};

export default VendorManagement;