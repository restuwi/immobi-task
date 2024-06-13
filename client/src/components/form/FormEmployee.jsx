import {
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { findAll, findOneByDepartment } from "../../libs/api/call/job";
import { findAll as findAllDepartment } from "../../libs/api/call/department";
import { create, edit } from "../../libs/api/call/employee";

import AlertSwal from "../alert/AlertSwal";

const FormEmployee = ({ fetchEmployee, onClose, initialValues }) => {
  const [departments, setDepartments] = React.useState([]);
  const [jobs, setJobs] = React.useState([]);
  const [formData, setFormData] = React.useState({
    name: "",
    age: "",
    gender: "M",
    birth_date: "",
    job_id: 0,
    department_id: 0,
    address: "",
  });

  React.useEffect(() => {
    if (initialValues) {
      setFormData({
        ...initialValues,
        birth_date: new Date(initialValues.birth_date)
          .toISOString()
          .split("T")[0],
      });
    }
  }, [initialValues]);

  const getDepartments = async () => {
    try {
      const response = await findAllDepartment();
      setDepartments(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getJobs = async (id) => {
    try {
      const response = await findOneByDepartment(id);
      setJobs(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getDepartments();
  }, []);

  React.useEffect(() => {
    getJobs(formData.department_id);
  }, [formData.department_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "job_id" || name === "age" || name === "department_id"
          ? +value
          : value,
    }));
  };

  const handleRadioChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      gender: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { department_id, ...employeeData } = formData;
    try {
      if (initialValues) {
        await edit(formData.id, employeeData);
        AlertSwal.success("Employee has been updated");
      } else {
        await create(formData);
        AlertSwal.success("Employee has been created");
      }
      fetchEmployee();
      onClose();
    } catch (error) {
      AlertSwal.error(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid templateColumns="repeat(2, 1fr)" gap={2}>
        <GridItem colSpan={{ base: 2, md: 1 }}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              placeholder="Type your name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ base: 2, md: 1 }}>
          <FormControl isRequired>
            <FormLabel>Age</FormLabel>
            <Input
              type="text"
              name="age"
              placeholder="20"
              value={formData.age}
              onChange={handleChange}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={{ base: 2, md: 1 }}>
          <FormControl isRequired>
            <FormLabel>Birth Date</FormLabel>
            <Input
              type="date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
            />
          </FormControl>
        </GridItem>
        <GridItem p={{ base: 0, md: 2 }} colSpan={{ base: 2, md: 1 }}>
          <FormControl isRequired>
            <FormLabel>Gender</FormLabel>
            <RadioGroup
              defaultValue="M"
              value={formData.gender}
              onChange={handleRadioChange}
            >
              <Stack direction="row">
                <Radio value="M">Male</Radio>
                <Radio value="F">Female</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ base: 2, md: 1 }}>
          <FormControl isRequired>
            <FormLabel>Department</FormLabel>
            <Select
              name="department_id"
              placeholder="Select Department"
              value={formData.department_id}
              onChange={handleChange}
            >
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.department_name}
                </option>
              ))}
            </Select>
          </FormControl>
        </GridItem>

        <GridItem colSpan={{ base: 2, md: 1 }}>
          <FormControl isRequired>
            <FormLabel>Job Title</FormLabel>
            <Select
              name="job_id"
              placeholder="Select Job Title"
              value={formData.job_id}
              onChange={handleChange}
            >
              {jobs ? (
                jobs?.map((job) => (
                  <option key={job?.id} value={job?.id}>
                    {job?.job_title}
                  </option>
                ))
              ) : (
                <option value="">Job Not Found</option>
              )}
            </Select>
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl isRequired>
            <FormLabel>Address</FormLabel>
            <Textarea
              name="address"
              placeholder="JL. Dukuh Atas"
              value={formData.address}
              onChange={handleChange}
            />
          </FormControl>
        </GridItem>
      </Grid>
    </form>
  );
};

export default FormEmployee;
