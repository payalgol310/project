import Joi from "joi";

const RegisterSchema = Joi.object({
  userName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

function validateReq(req, res, next) {
  const { error } = RegisterSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      errors: error.details.map((err) => err.message)
    });
  }
  next();
}

export { validateReq };
