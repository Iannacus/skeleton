const { Router } = require("express");
const { User, Participant } = require("../../models");
const {
  registerUser,
  loginUser,
  validateUserEmail,
} = require("./user.controllers");
const authenticate = require("../../middlewares/auth.middleware");
const { registerUserValidator, loginValidatior } = require("./user.validators");
const router = Router();

router
  .route("/users")
  .post(registerUserValidator, registerUser)
  .get(async (req, res, next) => {
    try {
      const result = await User.findAll({
        include: {
          model: Participant,
        },
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  });

router.post("/login", loginValidatior, loginUser);

router.post("/validate-user", validateUserEmail);

module.exports = router;
