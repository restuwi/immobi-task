import Department from "../models/Department.js";
import Job from "../models/Job.js";

export const findAll = async () => {
  return await Job.findAll({
    include: [
      {
        model: Department,
        attributes: ["department_name"],
      },
    ],
    order: [["id", "DESC"]],
  });
};

export const create = async (payload) => {
  return await Job.create(payload, {
    include: [
      {
        model: Department,
        attributes: ["department_name"],
      },
    ],
  });
};

export const findOne = async (id) => {
  return await Job.findOne({
    where: { id },
    include: [{ model: Department, attributes: ["department_name"] }],
  });
};

export const findAllByDepartment = async (id) => {
  return await Job.findAll({
    where: { department_id: id },
  });
};

export const edit = async (id, payload) => {
  const [rowsUpdated] = await Job.update(payload, { where: { id } });
  if (rowsUpdated === 0) {
    throw new Error("Job not found or not updated");
  }

  const updatedJob = await Job.findOne({
    where: { id },
    include: [{ model: Department, attributes: ["department_name"] }],
  });
  return updatedJob;
};

export const deleteJob = async (id) => {
  const rowsDeleted = await Job.destroy({ where: { id } });
  if (rowsDeleted === 0) {
    throw new Error("Job not found or not deleted");
  }
};
