import api from "../../../services/api";

const userService = {
  login: async (payload) => {
    const response = await api.post(
      "/auth/login",
      payload
    );

    return response.data;
  },

  register: async (payload) => {
    const response = await api.post(
      "/auth/register",
      payload
    );

    return response.data;
  },

  getProfile: async () => {
    const response = await api.get(
      "/auth/profile"
    );

    return response.data;
  },

  getUsers: async () => {
    const response = await api.get("/users");

    return response.data;
  },
};

export default userService;