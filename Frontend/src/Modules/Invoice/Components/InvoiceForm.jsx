import { useState } from "react";

import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";

const InvoiceForm = ({
  initialValues,
  onSubmit,
}) => {
  const [form, setForm] = useState(
    initialValues || {
      invoiceNumber: "",
      vendorName: "",
      amount: "",
      dueDate: "",
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
        label="Invoice Number"
        name="invoiceNumber"
        value={form.invoiceNumber}
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
        label="Due Date"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
      />

      <Button
        type="submit"
        className="w-full"
      >
        Save Invoice
      </Button>
    </form>
  );
};

export default InvoiceForm;