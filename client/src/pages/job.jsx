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
import { findAll, remove } from "../libs/api/call/job";
import FormJob from "../components/form/FormJob";

const Job = () => {
    const [jobs, setJobs] = React.useState([]);
    const [selectedJob, setSelectedJob] = React.useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalTitle, setModalTitle] = React.useState("Add Jobs");

    const getJobs = async () => {
        try {
            const response = await findAll();
            setJobs(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        getJobs();
    }, []);

    const handleCreate = () => {
        setModalTitle("Add Jobs");
        setSelectedJob(null);
        onOpen();
    };

    const handleEdit = (job) => {
        setModalTitle("Edit Jobs");
        setSelectedJob(job);
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
                getJobs();
            } catch (error) {
                AlertSwal.error('Failed to delete employee.');
                console.log(error);
            }
        }
    };

    return (
        <RootLayout title={"Jobs"}>
            <Flex justifyContent={"flex-end"} mb={2}>
                <Button
                    leftIcon={<FaPlus />}
                    variant={"outline"}
                    colorScheme={"blue"}
                    size={"sm"}
                    onClick={handleCreate}
                >
                    Add Jobs
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
                        "Job Title",
                    ]}
                >
                    {jobs.map((job, index) => (
                        <Tr key={job.id} _hover={{ bg: "gray.50" }}>
                            <Td>{index + 1}</Td>
                            <Td>{job?.department?.department_name}</Td>
                            <Td>{job?.job_title}</Td>
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
                                            onClick={() => handleEdit(job)}
                                        >
                                            Edit
                                        </MenuItem>
                                        <MenuDivider />
                                        <MenuItem
                                            color={"red.500"}
                                            icon={<FaEraser />}
                                            onClick={() => handleDelete(job.id)}
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
                <FormJob fetchJobs={getJobs} initialValue={selectedJob} onClose={onClose} />
            </ModalDialog>
        </RootLayout>
    );
};

export default Job;
