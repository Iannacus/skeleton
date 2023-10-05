// importamos las clases de errores de sequelize
const fs = require("node:fs/promises");
const path = require("node:path");
const {
  ConnectionError,
  ValidationError,
  DatabaseError,
} = require("sequelize");
const dayjs = require("dayjs");

// necesitamos un middleware para mostrar errores en la consola (log errors)

const getError = (req, err, res) => {
  const { body, url, method } = req;
  console.log(body);
  const formatBody = body ? JSON.stringify(body) : null;
  const { status, ...error } = err;
  return (
    `req: ${method} ${url} body: ${formatBody} \nres: status: ${status}, ${JSON.stringify(
      error
    )} ` + "\n\n"
  );
};

const errorLogger = (err, req, res, next) => {
  const date = new Date().toLocaleString();
  const current = dayjs().format("YYYY-MM-DD");
  console.log(err); // mostrar la fecha y hora en la que sucedio el error
  const filePath = path.join(__dirname, `../logs/${current}-logs.txt`);
  fs.appendFile(
    filePath,
    `====================ERROR ${date}=========================\n`
  );
  fs.appendFile(filePath, getError(req, err, res));
  next(err);
};

const ormErrorHandler = (err, req, res, next) => {
  // aqui llega un error lanzado en un controlador
  // verificamos si este error fue creado con la clase Connection error
  if (err instanceof ConnectionError) {
    return res.status(409).json({
      error: "database connection error",
      message: err.name,
    });
  }
  // verificamos si el error fue creado con la lase ValidationError
  if (err instanceof ValidationError) {
    return res.status(400).json({
      error: err.name,
      message: err?.original?.detail,
      errors: err.errors,
    });
  }

  if (err instanceof DatabaseError) {
    return res.status(409).json({
      error: err.name,
      message: err.message,
      errors: err.errors,
    });
  }

  next(err);
};

const jwtErrorHandler = (err, req, res, next) => {
  const jwtErrors = ["TokenExpiredError", "JsonWebTokenError"];

  if (jwtErrors.includes(err.name)) {
    return res.status(401).json({
      error: err.name,
      message: err.message,
    });
  }
  next(err);
};

// error
// {status, error, message}
const errorHandler = (err, req, res, next) => {
  const { status, ...error } = err;
  res.status(status || 500).json(error);
};

const notFoundErrorHandler = (req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested resource is not into the server",
  });
};

module.exports = {
  errorLogger,
  ormErrorHandler,
  jwtErrorHandler,
  errorHandler,
  notFoundErrorHandler,
};

// TODO tarea -> escribir un manejador de erroes  para jsonwebtoken
