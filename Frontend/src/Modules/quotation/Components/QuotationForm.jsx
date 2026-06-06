import { useState } from "react";

import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";

const QuotationForm = ({
  initialValues,
  onSubmit,
}) => {
  const [form, setForm] = useState(
    initialValues || {
      quotationNo: "",
      vendorName: "",
      amount: "",
      deliveryDays: "",
      warranty: "",
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
        label="Quotation No"
        name="quotationNo"
        value={form.quotationNo}
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
        label="Delivery Days"
        name="deliveryDays"
        value={form.deliveryDays}
        onChange={handleChange}
      />

      <Input
        label="Warranty"
        name="warranty"
        value={form.warranty}
        onChange={handleChange}
      />

      <Button
        type="submit"
        className="w-full"
      >
        Save Quotation
      </Button>
    </form>
  );
};

export default QuotationForm;