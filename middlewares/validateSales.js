const Joi = require('joi');

const schema = Joi.object({
  productId: Joi.number().min(1).greater(0).required(),
  quantity: Joi.number().min(1).greater(0).required(),
});

const validateSales = (req, res, next) => {
  const salesArr = [...req.body];
  const joiTypeArr = ['number.min'];
  salesArr.forEach(({ productId, quantity }) => {
    const { error } = schema.validate({ productId, quantity });

    if (error) {
      const joiType = error.details[0].type;
      if (joiTypeArr.includes(joiType)) {
        error.code = 'UNPROCESSABLE_ENTITY';
        return next(error);
      } 
      error.code = 'BAD_REQUEST';
      return next(error);
} 
});
  
  return next();
};

module.exports = validateSales;