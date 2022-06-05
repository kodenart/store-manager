const httpStatus = require('../utils/httpStatus');

const errorHandler = (err, req, res, _next) => {
  if (err.code && err.message) {
    return res.status(httpStatus[err.code]).json({ message: err.message });
  }

  return res.status(httpStatus.INTERNAL_ERROR).json('Something went wrong.');
};

module.exports = errorHandler;