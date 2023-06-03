const {
  userValidationMiddleware,
} = require('../../middlewares/validation.middleware');
const userManagementMiddleware = require('../../middlewares/userManagement.middleware');
const tokenGeneratorMiddleware = require('../../middlewares/generator.middleware');
const userController = {};

userController.createUser = async (req, res) => {
  let userType;

  try {
    userType = req.body.userType;

    await userValidationMiddleware(req, res, async () => {
      await userManagementMiddleware(
        req,
        res,
        async () => {
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
        },
        userType
      );
    });
  } catch (error) {
    console.error(error);
    let errorMessage = `Error al crear usuario con rol ${userType}`;
    return res.status(500).json({ message: errorMessage });
  }
};

module.exports = userController;
