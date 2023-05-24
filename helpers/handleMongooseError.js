const handleMongooseError = (error, data, next) => {
  // error.status = 400;
  const {name, code} = error;
  console.log("name", name);
  console.log("code", code);
  error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;

  next();
};

module.exports = handleMongooseError;
