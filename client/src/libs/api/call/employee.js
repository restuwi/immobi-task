import api from "..";

export const findAll = async () => {
  return await api.get("/employees");
};

export const create = async (payload) => {
  return await api.post("/employee", payload);
};

export const findOne = async (id) => {
  return await api.get(`/employee/${id}`);
};

export const edit = async (id, payload) => {
  return await api.put(`/employee/${id}`, payload);
};

export const remove = async (id) => {
  return await api.delete(`/employee/${id}`);
};
