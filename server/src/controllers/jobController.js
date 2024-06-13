import * as jobService from '../services/jobsService.js'
import handleErrorResponse from '../utils/errorHandleResponse.js';

export const getJobs = async (req, res) => {
    try {
        const response = await jobService.findAll();

        return res.json({
            success: true,
            message: 'Jobs fetched successfully',
            data: response
        });
    } catch (error) {
        console.log(error);
        return handleErrorResponse(res, 500, 'Internal server error', error);
    }
}

export const createJob = async (req, res) => {
    try {
        const response = await jobService.create(req.body);
        return res.json({
            success: true,
            message: 'Job created successfully',
            data: response
        });
    } catch (error) {
        console.log(error);
        return handleErrorResponse(res, 500, 'Internal server error', error);
    }
}

export const getJob = async (req, res) => {
    try {
        const id = req.params.id
        const response = await jobService.findOne(+id);
        return res.json({
            success: true,
            message: 'Job fetched successfully',
            data: response
        });
    } catch (error) {
        console.log(error);
        return handleErrorResponse(res, 500, 'Internal server error', error);
    }
}

export const updateJob = async (req, res) => {
    try {
        const id = req.params.id
        const response = await jobService.edit(+id, req.body);
        return res.json({
            success: true,
            message: 'Job updated successfully',
            data: response
        });
    } catch (error) {
        console.log(error);
        if(error.name === 'SequelizeForeignKeyConstraintError') {
            return handleErrorResponse(res, 400, 'Department not found or not updated', 'Department not found or not updated');
        }
        return handleErrorResponse(res, 500, 'Internal server error', error.message);
    }
}

export const deleteJob = async (req, res) => {
    try {
        const id = req.params.id
        const response = await jobService.deleteJob(+id);
        return res.json({
            success: true,
            message: `Job ${id} deleted successfully`,
            data: response
        });
    } catch (error) {
        console.log(error);
        if(error.name === 'SequelizeForeignKeyConstraintError') {
            return handleErrorResponse(res, 400, 'Job not found or not deleted', 'Department not found or not deleted');
        }
        return handleErrorResponse(res, 500, 'Internal server error', error.message);
    }
}