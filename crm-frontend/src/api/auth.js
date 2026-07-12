import api from "./axios";

export const login = (payload) => api.post("/auth/login", payload).then((r) => r.data);

export const register = (payload) => api.post("/auth/register", payload).then((r) => r.data);
