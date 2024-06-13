import * as departmentService from '../services/departmentService.js'
import handleErrorResponse from '../utils/errorHandleResponse.js';
export const getDepartments = async (req, res) => {
    try {
        const response = await departmentService.findAll();

        return res.json({
            success: true,
            message: 'Departments fetched successfully',
            data: response
        });
    } catch (error) {
        console.log(error)
        return handleErrorResponse(res, 500, 'Internal server error', error);
    }
}

export const createDepartment = async (req, res) => {
    try {
        const response = await departmentService.create(req.body);
        return res.json({
            success: true,
            message: 'Department created successfully',
            data: response
        });
    } catch (error) {
        console.log(error)
        return handleErrorResponse(res, 500, 'Internal server error', error);
    }
}

export const getDepartment = async (req, res) => {
    try {
        const id = req.params.id
        const response = await departmentService.findOne(+id);
        return res.json({
            success: true,
            message: 'Department fetched successfully',
            data: response
        });
    } catch (error) {
        console.log(error)
        return handleErrorResponse(res, 500, 'Internal server error', error);
    }
}

export const updateDepartment = async (req, res) => {
    try {
        const id = req.params.id
        const response = await departmentService.edit(+id, req.body);
        return res.json({
            success: true,
            message: 'Department updated successfully',
            data: response
        });
    } catch (error) {
        console.log(error)
        return handleErrorResponse(res, 500, 'Internal server error', error.message);
    }
}

export const deleteDepartment = async (req, res) => {
    try {
        const id = req.params.id
        await departmentService.deleteDepartment(+id);
        return res.json({
            success: true,
            message: `Department with id ${id} deleted successfully`,
        });
    } catch (error) {
        console.log(error)
        return handleErrorResponse(res, 500, 'Internal server error', error);
    }
}