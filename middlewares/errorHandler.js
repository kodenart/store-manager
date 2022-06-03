const httpStatus = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_ERROR: 500,
};

const errorHandler = (err, req, res, _next) => {
  if (err.isJoi) {
    return res.status(httpStatus[err.code]).json({ message: err.message }); 
  }

  return res.status(httpStatus.INTERNAL_ERROR).json('Something went wrong.');
};

module.exports = errorHandler;