const validateBody = (schema) => {
  const validate = (req, res, next) => {
    const {error} = schema.validate(req.body);
    if (error) {
      next(error);
    }
    next();
  };
  return validate;
};
module.exports = validateBody;
