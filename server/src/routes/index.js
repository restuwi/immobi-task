// ./routes/index.js

import express from "express";
import {
  createDepartment,
  deleteDepartment,
  getDepartment,
  getDepartments,
  updateDepartment,
} from "../controllers/departmentController.js";
import {
  createJob,
  deleteJob,
  getJob,
  getJobByDepartment,
  getJobs,
  updateJob,
} from "../controllers/jobController.js";
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "../controllers/employeeService.js";

const router = express.Router();

router.get("/departments", getDepartments);
router.get("/department/:id", getDepartment);
router.post("/department", createDepartment);
router.put("/department/:id", updateDepartment);
router.delete("/department/:id", deleteDepartment);

router.get("/jobs", getJobs);
router.get("/job/:id", getJob);
router.get("/jobs/department/:id", getJobByDepartment);
router.post("/job", createJob);
router.put("/job/:id", updateJob);
router.delete("/job/:id", deleteJob);

router.get("/employees", getEmployees);
router.post("/employee", createEmployee);
router.get("/employee/:id", getEmployee);
router.put("/employee/:id", updateEmployee);
router.delete("/employee/:id", deleteEmployee);

export default router;
