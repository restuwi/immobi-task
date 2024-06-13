import * as employeeService from '../services/employeeService.js'
import handleErrorResponse from '../utils/errorHandleResponse.js';


export const getEmployees = async (req, res) => {
    try {
        const response = await employeeService.findAll();
        return res.json({
            success: true,
            message: 'Employees fetched successfully',
            data: response
        });
    } catch (error) {
        console.log(error)
        return handleErrorResponse(res, 500, 'Internal server error', error);
    }
}


export const createEmployee = async (req, res) => {
    try {
        const response = await employeeService.create(req.body);
        return res.json({
            success: true,
            message: 'Employee created successfully',
            data: response
        });
    } catch (error) {
        console.log(error)
        return handleErrorResponse(res, 500, 'Internal server error', error);
    }
}


export const getEmployee = async (req, res) => {
    try {
        const id = req.params.id
        const response = await employeeService.findOne(+id);
        return res.json({
            success: true,
            message: 'Employee fetched successfully',
            data: response
        });
    } catch (error) {
        console.log(error)
        return handleErrorResponse(res, 500, 'Internal server error', error);
    }
}


export const updateEmployee = async (req, res) => {
    try {
        const id = req.params.id
        const response = await employeeService.edit(+id, req.body);
        return res.json({
            success: true,
            message: 'Employee updated successfully',
            data: response
        });
    } catch (error) {
        console.log(error)
        return handleErrorResponse(res, 500, 'Internal server error', error.message);
    }
}   


export const deleteEmployee = async (req, res) => {
    try {
        const id = req.params.id
        const response = await employeeService.deleteEmployee(+id);
        return res.json({
            success: true,
            message: `Employee with id ${id} deleted successfully`,
        });
    } catch (error) {
        console.log(error)
        return handleErrorResponse(res, 500, 'Internal server error', error.message);
    }
}