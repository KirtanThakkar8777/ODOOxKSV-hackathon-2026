import { useNavigate } from "react-router-dom";

import Header from "../../../components/layout/Header";

import VendorForm from "../components/VendorForm";
import useVendor from "../hooks/useVendor";

const AddVendor = () => {
  const navigate = useNavigate();

  const { createVendor } =
    useVendor();

  const handleSubmit =
    async (data) => {
      await createVendor(data);

      navigate("/vendors");
    };

  return (
    <div>
      <Header
        title="Add Vendor"
        subtitle="Create new vendor profile"
      />

      <div className="bg-white p-6 rounded-xl">
        <VendorForm
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AddVendor;