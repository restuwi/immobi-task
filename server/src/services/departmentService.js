import Department from "../models/Department.js";
export const findAll = async () => {
  return await Department.findAll({
    order: [["id", "DESC"]],
  });
};

export const create = async (payload) => {
  return await Department.create(payload);
};

export const findOne = async (id) => {
  return await Department.findOne({ where: { id } });
};

export const edit = async (id, payload) => {
  const [rowsUpdated] = await Department.update(payload, { where: { id } });
  if (rowsUpdated === 0) {
    throw new Error("Department not found or not updated");
  }

  const updatedDepartment = await Department.findOne({ where: { id } });
  return updatedDepartment;
};

export const deleteDepartment = async (id) => {
  const rowsDeleted = await Department.destroy({ where: { id } });
  if (rowsDeleted === 0) {
    throw new Error("Department not found or not deleted");
  }
};
