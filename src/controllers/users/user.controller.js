const {
  userValidationMiddleware,
} = require('../../middlewares/validation.middleware');
const userManagementMiddleware = require('../../middlewares/userManagement.middleware');
const tokenGeneratorMiddleware = require('../../middlewares/generator.middleware');
const userController = {};

userController.createUser = async (req, res, next) => {
  let userType;

  try {
    userType = req.body.userType;

    await userValidationMiddleware(req, res, async () => {
      // Realizar acciones de gestión de usuario según el tipo
      await userManagementMiddleware(req, res, next, userType);
    });

    await tokenGeneratorMiddleware(req, res, async () => {
      const user = res.locals.user;
      const tokens = res.locals.tokens;

      user.refreshToken = tokens.refreshToken;
      await user.save();

      return res.status(201).json({
        message: `Usuario con rol ${userType} creado con éxito`,
        userType,
        user,
      });
    });
  } catch (error) {
    console.error(error);
    let errorMessage = `Error al crear usuario con rol ${userType}`;
    return res.status(500).json({ message: errorMessage });
  }
};

module.exports = userController;
