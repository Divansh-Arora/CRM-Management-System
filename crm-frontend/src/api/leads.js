import api from "./axios";

export const getAllLeads = () => api.get("/leads").then((r) => r.data);

export const getLeadById = (id) => api.get(`/leads/${id}`).then((r) => r.data);

export const addLead = (payload) => api.post("/leads", payload).then((r) => r.data);

export const updateLead = (id, payload) => api.put(`/leads/${id}`, payload).then((r) => r.data);

export const deleteLead = (id) => api.delete(`/leads/${id}`).then((r) => r.data);

export const convertLead = (id) => api.post(`/leads/${id}/convert`).then((r) => r.data);

export const searchLeads = ({ customerName = "", page = 0, size = 5, sortBy = "customerName" }) =>
  api
    .get("/leads/search", { params: { customerName, page, size, sortBy } })
    .then((r) => r.data);
