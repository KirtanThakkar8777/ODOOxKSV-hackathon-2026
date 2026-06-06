import { useState } from "react";

import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";

const RFQForm = ({
  initialValues,
  onSubmit,
}) => {
  const [form, setForm] = useState(
    initialValues || {
      rfqNo: "",
      title: "",
      description: "",
      deadline: "",
      status: "Draft",
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
        label="RFQ Number"
        name="rfqNo"
        value={form.rfqNo}
        onChange={handleChange}
      />

      <Input
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
      />

      <Input
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
      />

      <Input
        label="Deadline"
        type="date"
        name="deadline"
        value={form.deadline}
        onChange={handleChange}
      />

      <Button
        type="submit"
        className="w-full"
      >
        Save RFQ
      </Button>
    </form>
  );
};

export default RFQForm;