import React from "react";
import RootLayout from "../layouts/RootLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Box,
  MenuDivider,
  Text,
} from "@chakra-ui/react";
import { findAll } from "../libs/api/call/employee";
import { HiDotsVertical } from "react-icons/hi";
import { convertDate } from "../libs/momment";
import TableData from "../components/TableData";
import { FaEraser, FaPencilAlt } from "react-icons/fa";

const Dashboard = () => {
  const [employees, setEmployees] = React.useState([]);

  const getEmployees = async () => {
    try {
      const response = await findAll();
      setEmployees(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getEmployees();
  }, []);

  const totalEmployees = employees.length;
  const maleEmployees = employees.filter((emp) => emp.gender === "M").length;
  const femaleEmployees = employees.filter((emp) => emp.gender === "F").length;

  return (
    <RootLayout title={"Dashboard"}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        <Stat bg="white" p={4} borderRadius="lg" boxShadow="md">
          <StatLabel>Total Employees</StatLabel>
          <StatNumber>{totalEmployees}</StatNumber>
        </Stat>
        <Stat bg="white" p={4} borderRadius="lg" boxShadow="md">
          <StatLabel>Male Employees</StatLabel>
          <StatNumber>{maleEmployees}</StatNumber>
        </Stat>
        <Stat bg="white" p={4} borderRadius="lg" boxShadow="md">
          <StatLabel>Female Employees</StatLabel>
          <StatNumber>{femaleEmployees}</StatNumber>
        </Stat>
      </SimpleGrid>
      <Heading size="md" mt={8}>
        Latest Employees
      </Heading>
      <Box
        mt={4}
        overflowX="auto"
        bg="white"
        p={4}
        borderRadius="lg"
        boxShadow="lg"
      >
        <TableData
          tHead={[
            "No.",
            "Name",
            "Job",
            "Age",
            "Gender",
            "Birth Date",
            "Address",
          ]}
        >
          {employees.map((employee, index) => (
            <Tr key={employee.id} _hover={{ bg: "gray.50" }}>
              <Td>{index + 1}</Td>
              <Td>
                <Flex align="center">
                  <Text textTransform={"capitalize"} fontWeight="bold">
                    {employee.name}
                  </Text>
                </Flex>
              </Td>
              <Td>{employee?.job?.job_title}</Td>
              <Td>{employee.age}</Td>
              <Td>{employee.gender === "M" ? "Male" : "Female"}</Td>
              <Td>{convertDate(employee.birth_date)}</Td>
              <Td>{employee.address}</Td>
              <Td>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<HiDotsVertical />}
                    variant="outline"
                    borderRadius="full"
                  />
                  <MenuList borderRadius="md" shadow="lg">
                    <MenuItem
                      icon={<FaPencilAlt />}
                      onClick={() => handleEdit(employee)}
                    >
                      Edit
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                      color={"red.500"}
                      icon={<FaEraser />}
                      onClick={() => handleDelete(employee.id)}
                    >
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          ))}
        </TableData>
      </Box>
    </RootLayout>
  );
};

export default Dashboard;
