const {
  errorLogger,
  ormErrorHandler,
  errorHandler,
  notFoundErrorHandler,
  jwtErrorHandler,
} = require("../middlewares/errors.middleware");

const errorRoutes = (app) => {
  app.use(errorLogger); // mostramos el error por consola
  app.use(ormErrorHandler); // buscamos si el error es del ORM
  app.use(jwtErrorHandler);
  app.use(errorHandler); // Errores personales
  app.use(notFoundErrorHandler); // mandamos 404 para rutas no encontradas
};

module.exports = errorRoutes;
