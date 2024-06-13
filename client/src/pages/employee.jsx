import React from "react";
import RootLayout from "../layouts/RootLayout";
import {
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Td,
    Tr,
    Box,
    Flex,
    Text,
    MenuDivider,
    useDisclosure,
    Button,
} from "@chakra-ui/react";
import { findAll, remove } from "../libs/api/call/employee";
import { convertDate } from "../libs/momment";
import TableData from "../components/TableData";
import { HiDotsVertical } from "react-icons/hi";
import { FaEraser, FaPencilAlt, FaPlus } from "react-icons/fa";
import ModalDialog from "../components/ModalDialog";
import FormEmployee from "../components/form/FormEmployee";
import AlertSwal from "../components/alert/AlertSwal";
import useDocumentTitle from "../utils/useDocumentTitle";

const Employee = () => {
    const [employees, setEmployees] = React.useState([]);
    const [selectedEmployee, setSelectedEmployee] = React.useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalTitle, setModalTitle] = React.useState("Add Employee");

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

    const handleCreate = () => {
        setModalTitle("Add Employee");
        setSelectedEmployee(null);
        onOpen();
    };

    const handleEdit = (employee) => {
        setModalTitle("Edit Employee");
        setSelectedEmployee(employee);
        onOpen();
    };

    const handleSave = () => {
        const form = document.querySelector('form');
        if (form) {
            form.requestSubmit();
        }
    };

    const handleDelete = async (id) => {
        const result = await AlertSwal.confirm('You won\'t be able to revert this!');
        console.log(result);
        if (result.isConfirmed) {
            try {
                await remove(id);
                AlertSwal.success('Employee has been deleted.');
                getEmployees();
            } catch (error) {
                AlertSwal.error('Failed to delete employee.');
                console.log(error);
            }
        }
    };


    return (
        <RootLayout title={"Employees"}>
            <Flex justifyContent={"flex-end"} mb={2}>
                <Button
                    leftIcon={<FaPlus />}
                    variant={"outline"}
                    colorScheme={"blue"}
                    size={"sm"}
                    onClick={handleCreate}
                >
                    Add Employee
                </Button>
            </Flex>
            <Box
                overflowX="auto"
                w={"100%"}
                bg="white"
                p={5}
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
                                    <Text textTransform={"capitalize"} fontWeight="bold">{employee.name}</Text>
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

            <ModalDialog
                isOpen={isOpen}
                onClose={onClose}
                modalTitle={modalTitle}
                size={"xl"}
                onSave={handleSave}
            >
                <FormEmployee
                    fetchEmployee={getEmployees}
                    onClose={onClose}
                    initialValues={selectedEmployee}
                />
            </ModalDialog>
        </RootLayout>
    );
};

export default Employee;
