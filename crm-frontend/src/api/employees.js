import api from "./axios";

export const getAllEmployees = () => api.get("/employees").then((r) => r.data);

export const getEmployeeById = (id) => api.get(`/employees/${id}`).then((r) => r.data);

export const addEmployee = (payload) => api.post("/employees", payload).then((r) => r.data);

export const updateEmployee = (id, payload) =>
  api.put(`/employees/${id}`, payload).then((r) => r.data);

export const deleteEmployee = (id) => api.delete(`/employees/${id}`).then((r) => r.data);

export const searchEmployees = ({ name = "", page = 0, size = 5, sortBy = "name" }) =>
  api.get("/employees/search", { params: { name, page, size, sortBy } }).then((r) => r.data);
