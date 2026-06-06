import { useState } from "react";

import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";

const VendorForm = ({
  initialValues,
  onSubmit,
}) => {
  const [form, setForm] = useState(
    initialValues || {
      companyName: "",
      contactPerson: "",
      email: "",
      phone: "",
      address: "",
      category: "",
      status: "Pending",
    }
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <Input
        label="Company Name"
        name="companyName"
        value={form.companyName}
        onChange={handleChange}
      />

      <Input
        label="Contact Person"
        name="contactPerson"
        value={form.contactPerson}
        onChange={handleChange}
      />

      <Input
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />

      <Input
        label="Phone"
        name="phone"
        value={form.phone}
        onChange={handleChange}
      />

      <Input
        label="Address"
        name="address"
        value={form.address}
        onChange={handleChange}
      />

      <Input
        label="Category"
        name="category"
        value={form.category}
        onChange={handleChange}
      />

      <Button
        type="submit"
        className="w-full"
      >
        Save Vendor
      </Button>
    </form>
  );
};

export default VendorForm;