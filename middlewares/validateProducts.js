const Joi = require('joi');

const validateSales = (req, res, next) => {
  const { name, quantity } = req.body;

  const { error } = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().min(1).greater(0).required(),
  }).validate({ name, quantity });

  const joiTypes = ['string.min', 'number.min'];

  if (error) {
    const joiErrorType = error.details[0].type;
    if (joiTypes.includes(joiErrorType)) {
      error.code = 'UNPROCESSABLE_ENTITY';
      return next(error);
    } 
    error.code = 'BAD_REQUEST';
    return next(error);
  }
  
  return next();
};

module.exports = validateSales;