import api from "./axios";

export const getAllCustomers = () => api.get("/customers").then((r) => r.data);

export const getCustomerById = (id) => api.get(`/customers/${id}`).then((r) => r.data);

export const addCustomer = (payload) => api.post("/customers", payload).then((r) => r.data);

export const updateCustomer = (id, payload) =>
  api.put(`/customers/${id}`, payload).then((r) => r.data);

export const deleteCustomer = (id) => api.delete(`/customers/${id}`).then((r) => r.data);

export const searchCustomers = ({ name = "", page = 0, size = 5, sortBy = "firstName" }) =>
  api
    .get("/customers/search", { params: { name, page, size, sortBy } })
    .then((r) => r.data);
