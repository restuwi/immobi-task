import React from 'react';
import {
    FormControl,
    FormLabel,
    Select,
    Stack,
    Input,
} from '@chakra-ui/react';
import { create as createJob, edit } from '../../libs/api/call/job';
import AlertSwal from '../alert/AlertSwal';
import { findAll } from '../../libs/api/call/department';

const FormJob = ({ fetchJobs, onClose, initialValue }) => {
    const [formData, setFormData] = React.useState({
        department_id: 0,
        job_title: ''
    });
    const [departments, setDepartments] = React.useState([]);

    React.useEffect(() => {
        if (initialValue) setFormData(initialValue);
    }, [initialValue])

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'department_id' ? +value : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (initialValue) {
                await edit(initialValue.id, formData);
                AlertSwal.success('Job has been updated');
                fetchJobs();
                onClose();
            } else {
                await createJob(formData);
                AlertSwal.success('Job has been created');
                fetchJobs();
                onClose();
            }

        } catch (error) {
            AlertSwal.error('Failed to create job');
            console.error(error);
            onClose();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
                <FormControl isRequired>
                    <FormLabel>Department</FormLabel>
                    <Select
                        name="department_id"
                        placeholder="Select Department"
                        value={formData.department_id}
                        onChange={handleChange}
                    >
                        {departments.map((dept) => (
                            <option key={dept.id} value={dept.id}>
                                {dept.department_name}
                            </option>
                        ))}
                    </Select>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Job Title</FormLabel>
                    <Input type={"text"} placeholder="Job Title" name="job_title" value={formData.job_title} onChange={handleChange} />
                </FormControl>
            </Stack>
        </form>
    );
};

export default FormJob;
