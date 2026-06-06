import { useState } from "react";

import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";

const PurchaseOrderForm = ({
  initialValues,
  onSubmit,
}) => {
  const [form, setForm] = useState(
    initialValues || {
      poNumber: "",
      vendorName: "",
      amount: "",
      orderDate: "",
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
        label="PO Number"
        name="poNumber"
        value={form.poNumber}
        onChange={handleChange}
      />

      <Input
        label="Vendor"
        name="vendorName"
        value={form.vendorName}
        onChange={handleChange}
      />

      <Input
        label="Amount"
        name="amount"
        value={form.amount}
        onChange={handleChange}
      />

      <Input
        type="date"
        label="Order Date"
        name="orderDate"
        value={form.orderDate}
        onChange={handleChange}
      />

      <Button
        type="submit"
        className="w-full"
      >
        Save Purchase Order
      </Button>
    </form>
  );
};

export default PurchaseOrderForm;