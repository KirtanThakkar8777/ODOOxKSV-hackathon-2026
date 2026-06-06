import { useState } from "react";

import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";

const UserForm = ({
  initialValues,
  onSubmit,
}) => {
  const [form, setForm] = useState(
    initialValues || {
      name: "",
      email: "",
      role: "",
      password: "",
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
        label="Full Name"
        name="name"
        value={form.name}
        onChange={handleChange}
      />

      <Input
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />

      <Input
        label="Role"
        name="role"
        value={form.role}
        onChange={handleChange}
      />

      <Input
        label="Password"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
      />

      <Button
        type="submit"
        className="w-full"
      >
        Save User
      </Button>
    </form>
  );
};

export default UserForm;