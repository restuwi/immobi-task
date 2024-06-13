import React from "react";
import { FormControl, FormLabel, Stack, Input } from "@chakra-ui/react";
import AlertSwal from "../alert/AlertSwal";
import { create, edit } from "../../libs/api/call/department";

const FormDepartment = ({ fetchDepartments, onClose, initialValue }) => {
    const [formData, setFormData] = React.useState({
        department_name: "",
    });

    React.useEffect(() => {
        if (initialValue) setFormData(initialValue);
    }, [initialValue]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (initialValue) {
                await edit(initialValue.id, formData);
                AlertSwal.success("Department has been updated");
                fetchDepartments();
                onClose();
            } else {
                await create(formData);
                AlertSwal.success("Department has been created");
                fetchDepartments();
                onClose();
            }
        } catch (error) {
            AlertSwal.error("Failed to create Department");
            console.error(error);
            onClose();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
                <FormControl isRequired>
                    <FormLabel>Department Name</FormLabel>
                    <Input
                        type={"text"}
                        placeholder="IT Development"
                        name="department_name"
                        value={formData.department_name}
                        onChange={handleChange}
                    />
                </FormControl>
            </Stack>
        </form>
    );
};

export default FormDepartment;
