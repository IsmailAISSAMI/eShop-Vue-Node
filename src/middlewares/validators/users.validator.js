const Joi = require("joi");

const userSchemaValidation = (req, res, next) => {
  // const addressSchema = Joi.object().keys({
  //     street: Joi.string().required(),
  //     city: Joi.string().required(),
  //     country: Joi.string().required(),
  //     zip: Joi.number().required()
  // }).unknown(true);

  const userValidationSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.string().min(6).max(15).required(),
    // address: addressSchema,
    street: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    zip: Joi.number().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,64}$/)
      .required(),
    isAdmin: Joi.boolean(),
    orders: Joi.allow(null),
  });

  const validation = userValidationSchema.validate(req.body);

  if (validation.error) {
    return res.status(400).send({
      error: validation.error,
    });
  }

  next();
};

module.exports = userSchemaValidation;
