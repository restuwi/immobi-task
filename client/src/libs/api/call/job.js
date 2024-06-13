import api from "..";

export const findAll = async () => {
  return await api.get("/jobs");
};

export const create = async (payload) => {
  return await api.post("/job", payload);
};

export const findOne = async (id) => {
  return await api.get(`/job/${id}`);
};

export const findOneByDepartment = async (id) => {
  return await api.get(`/jobs/department/${id}`);
};

export const edit = async (id, payload) => {
  return await api.put(`/job/${id}`, payload);
};

export const remove = async (id) => {
  return await api.delete(`/job/${id}`);
};
