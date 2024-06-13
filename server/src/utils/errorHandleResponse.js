const handleErrorResponse = (res, statusCode, message, details) => {
    const errorResponse = {
        status: false,
        message,
        error: {
            code: statusCode,
            details
        }
    }

    res.status(statusCode).json(errorResponse)
}

export default handleErrorResponse