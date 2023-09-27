const { check, validationResult } = require("express-validator");
const validateResult = require("../../middlewares/validator.middleware");

const registerUserValidator = [
  check("firstname", "Error con firstname")
    .exists()
    .withMessage("No se incluye la propiedad firstname")
    .notEmpty()
    .withMessage("El firstname no debe estar vacio")
    .isString()
    .withMessage("El valor del firstname debe ser string")
    .isLength({ min: 2, max: 50 })
    .withMessage("La longitud del nombre de ser entre 2 y 50 caracteres")
    .matches(/^[a-zA-Z\s]/)
    .withMessage("El firstname solo acepta letras"),
  check("lastname", "Error con lastname")
    .exists()
    .withMessage("No se incluye la propiedad lastname")
    .notEmpty()
    .withMessage("El lastname no debe estar vacio")
    .isString()
    .withMessage("El valor del lastname debe ser string")
    .isLength({ min: 2, max: 50 })
    .withMessage("La longitud del apellido de ser entre 2 y 50 caracteres")
    .matches(/^[a-zA-Z\s]/)
    .withMessage("El lastname solo acepta letras"),
  check("email", "Error con el campo email")
    .exists()
    .withMessage("La propiedad email no esta incluida")
    .notEmpty()
    .withMessage("La propiedad email no debe estar vacia")
    .isString()
    .withMessage("La propiedad email debe ser string")
    .isEmail()
    .withMessage("La propiedad email no tiene el formato de correo")
    .isLength({ min: 7, max: 50 })
    .withMessage("El email debe ser minimo 7 y máximo 50 caracteres"),
  check("password", "Error en el campo password")
    .exists()
    .withMessage("La propiedad password no esta incluida")
    .notEmpty()
    .withMessage("La propiedad password no debe estar vacia")
    .isString()
    .withMessage("La propiedad email debe ser string")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%-^&*]{8,}$/
    )
    .withMessage(
      "El password debe ser minimo 8 caracteres, una mayuscula, una minuscula"
    ),
  validateResult,
];

const loginValidatior = [
  check("email", "Error con la propiedad email")
    .exists()
    .withMessage("La propiedad email no esta incluida")
    .notEmpty()
    .withMessage("La propiedad email no debe estar vacia")
    .isString()
    .withMessage("La propiedad email debe ser string")
    .isEmail()
    .withMessage("La propiedad email no tiene el formato de correo"),
  check("password", "Error en el campo password")
    .exists()
    .withMessage("La propiedad password no esta incluida")
    .notEmpty()
    .withMessage("La propiedad password no debe estar vacia")
    .isString()
    .withMessage("La propiedad email debe ser string"),
  validateResult,
];

module.exports = {
  registerUserValidator,
  loginValidatior,
};

// construir una expresion regular para nombres ?
