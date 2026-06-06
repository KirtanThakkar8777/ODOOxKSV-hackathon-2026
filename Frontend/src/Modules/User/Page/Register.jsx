import { useNavigate } from "react-router-dom";

import UserForm from "../components/UserForm";

import useUser from "../hooks/useUser";

const Register = () => {
  const navigate = useNavigate();

  const { register } =
    useUser();

  const handleSubmit =
    async (data) => {
      await register(data);

      navigate("/login");
    };

  return (
    <div
      className="
      bg-white
      p-8
      rounded-2xl
      w-[500px]
      "
    >
      <h2
        className="
        text-3xl
        font-bold
        mb-6
        "
      >
        Create Account
      </h2>

      <UserForm
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Register;