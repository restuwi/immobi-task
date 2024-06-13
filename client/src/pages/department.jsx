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
    MenuDivider,
    useDisclosure,
    Button,
} from "@chakra-ui/react";
import TableData from "../components/TableData";
import { HiDotsVertical } from "react-icons/hi";
import { FaEraser, FaPencilAlt, FaPlus } from "react-icons/fa";
import ModalDialog from "../components/ModalDialog";
import AlertSwal from "../components/alert/AlertSwal";
import { findAll, remove } from "../libs/api/call/department";
import FormDepartment from "../components/form/FormDepartment";

const Department = () => {
    const [departments, setDepartments] = React.useState([]);
    const [selectedDepartment, setSelectedDepartment] = React.useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalTitle, setModalTitle] = React.useState("Add Departments");
    const getDepartments = async () => {
        try {
            const response = await findAll();
            setDepartments(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        getDepartments();
    }, []);

    const handleCreate = () => {
        setModalTitle("Add Departments");
        setSelectedDepartment(null);
        onOpen();
    };

    const handleEdit = (department) => {
        setModalTitle("Edit Departments");
        setSelectedDepartment(department);
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
        if (result.isConfirmed) {
            try {
                await remove(id);
                AlertSwal.success('Deparrtment has been deleted.');
                getDepartments();
            } catch (error) {
                AlertSwal.error('Failed to delete employee.');
                console.log(error);
            }
        }
    };


    return (
        <RootLayout title={"Departments"}>
            <Flex justifyContent={"flex-end"} mb={2}>
                <Button
                    leftIcon={<FaPlus />}
                    variant={"outline"}
                    colorScheme={"blue"}
                    size={"sm"}
                    onClick={handleCreate}
                >
                    Add Department
                </Button>
            </Flex>
            <Box
                overflowX="auto"
                w={"100%"}
                bg="white"
                p={4}
                borderRadius="lg"
                boxShadow="lg"
            >
                <TableData
                    tHead={[
                        "No.",
                        "Department",
                    ]}
                >
                    {departments.map((department, index) => (
                        <Tr key={department.id} _hover={{ bg: "gray.50" }}>
                            <Td>{index + 1}</Td>
                            <Td>{department?.department_name}</Td>
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
                                            onClick={() => handleEdit(department)}
                                        >
                                            Edit
                                        </MenuItem>
                                        <MenuDivider />
                                        <MenuItem
                                            color={"red.500"}
                                            icon={<FaEraser />}
                                            onClick={() => handleDelete(department.id)}
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
                <FormDepartment fetchDepartments={getDepartments} initialValue={selectedDepartment} onClose={onClose} />
            </ModalDialog>
        </RootLayout>
    );
};

export default Department;
