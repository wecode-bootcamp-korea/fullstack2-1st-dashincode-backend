const httpErrorStatus = {
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Require',
    403: 'Forbidden',
    404: 'Not Found',
    408: 'Request Timeout',
    409: 'Conflict',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    505: 'HTTP Version Not Supported'
}

const errorStatus = (statusCode = 500, message) => {
    const err = new Error(message || httpErrorStatus[statusCode]);
    err.statusCode = statusCode;
    throw err;
};

export default errorStatus;