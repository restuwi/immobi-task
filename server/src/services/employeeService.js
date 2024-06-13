import Employee from "../models/Employee.js";
import Job from "../models/Job.js";

export const findAll = async () => {
  return await Employee.findAll({
    include: [
      {
        model: Job,
        attributes: ["job_title"],
      },
    ],
    order: [["id", "DESC"]],
  });
};

export const create = async (payload) => {
  return await Employee.create(payload, {
    include: [
      {
        model: Job,
        attributes: ["job_title"],
      },
    ],
  });
};

export const findOne = async (id) => {
  return await Employee.findOne({
    where: { id },
    include: [{ model: Job, attributes: ["job_title"] }],
  });
};

export const edit = async (id, payload) => {
  const [rowsUpdated] = await Employee.update(payload, { where: { id } });
  if (rowsUpdated === 0) {
    throw new Error("Employee not found or not updated");
  }

  const updatedEmployee = await Employee.findOne({
    where: { id },
    include: [{ model: Job, attributes: ["job_title"] }],
  });
  return updatedEmployee;
};

export const deleteEmployee = async (id) => {
  const rowsDeleted = await Employee.destroy({ where: { id } });
  if (rowsDeleted === 0) {
    throw new Error("Employee not found or not deleted");
  }
};
