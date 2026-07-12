import api from "./axios";

export const getAllTasks = () => api.get("/tasks").then((r) => r.data);

export const getTaskById = (id) => api.get(`/tasks/${id}`).then((r) => r.data);

export const addTask = (payload) => api.post("/tasks", payload).then((r) => r.data);

export const updateTask = (id, payload) => api.put(`/tasks/${id}`, payload).then((r) => r.data);

export const deleteTask = (id) => api.delete(`/tasks/${id}`).then((r) => r.data);

export const searchTasks = ({ title = "", page = 0, size = 5, sortBy = "title" }) =>
  api.get("/tasks/search", { params: { title, page, size, sortBy } }).then((r) => r.data);
