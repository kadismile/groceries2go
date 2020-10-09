
const ErrorResponse = require('../utils/errorResponse');

module.exports.errorHandler = (err, res) => {
    
    let error = {...err};
    error.message = err.message;
    if (err.type === 'entity.parse.failed') {
        const message = `Wrong Entity as been Parsed`;
        error = new ErrorResponse(message, 404)
    }

    if (err.type === 'headers_error') {
        let entity = err.entity || 'specific entity';
        const message = `No ${entity} present in headers`;
        error = new ErrorResponse(message, 404)
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        const message = `Unique Entity Error`;
        error = new ErrorResponse(message, 404)
    }

    if (err === 'Not authorized to access this route') {
        const message = `Not authorized to access this route`;
        error = new ErrorResponse(message, 401)
    }
    
    if (err === 'invalidPhone') {
        const message = `Not authorized to access this route`;
        error = new ErrorResponse(message, 401)
    }

    if (err.code === 11000) {
        console.log(Object.values(err.keyValue)[0]   )
        const message = `${Object.values(err.keyValue)[0]} already exists`;
        error = new ErrorResponse(message, 409)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    })
};