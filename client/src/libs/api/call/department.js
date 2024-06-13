import api from "..";

export const findAll = async () => {
  return await api.get("/departments");
};

export const create = async (payload) => {
  return await api.post("/department", payload);
};

export const findOne = async (id) => {
  return await api.get(`/department/${id}`);
};

export const edit = async (id, payload) => {
  return await api.put(`/department/${id}`, payload);
};

export const remove = async (id) => {
  return await api.delete(`/department/${id}`);
};
