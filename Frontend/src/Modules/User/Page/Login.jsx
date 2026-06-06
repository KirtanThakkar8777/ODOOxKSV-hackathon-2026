import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";

import useUser from "../hooks/useUser";

const Login = () => {
  const navigate = useNavigate();

  const { login, error } =
    useUser();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    const result =
      await login(form);

    if (result) {
      navigate("/");
    }
  };

  return (
    <div
      className="
      bg-white
      p-8
      rounded-2xl
      w-[420px]
      "
    >
      <h2
        className="
        text-3xl
        font-bold
        mb-2
        "
      >
        Welcome Back
      </h2>

      <p className="text-slate-500 mb-6">
        Sign in to continue
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <Input
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <Input
          type="password"
          label="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        {error && (
          <p className="text-red-500">
            {error}
          </p>
        )}

        <Button
          type="submit"
          className="w-full"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;