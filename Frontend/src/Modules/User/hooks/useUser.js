import { useState } from "react";

import userService from "../Service/user.service";
import useUserStore from "../store/userStore";

const useUser = () => {
  const {
    setUser,
    setToken,
    setLoading,
  } = useUserStore();

  const [error, setError] =
    useState(null);

  const login = async (payload) => {
    try {
      setLoading(true);

      const data =
        await userService.login(payload);

      setUser(data.user);

      setToken(data.token);

      return data;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    payload
  ) => {
    try {
      setLoading(true);

      const data =
        await userService.register(
          payload
        );

      return data;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    register,
    error,
  };
};

export default useUser;