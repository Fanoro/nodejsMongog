const {
  userValidationMiddleware,
} = require('../../middlewares/validation.middleware');
const User = require('../../models/user/user.model');
const userManagementMiddleware = require('../../middlewares/userManagement.middleware');
const tokenGeneratorMiddleware = require('../../middlewares/generator.middleware');
const userController = {};

userController.createUser = async (req, res, next) => {
  const userType = req.body.userType;

  try {
    await userManagementMiddleware(req, res, next, userType);

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

userController.getUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).populate('role');

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    return res
      .status(200)
      .json({ message: 'Usuario obtenido con éxito', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener usuario' });
  }
};

userController.updateUser = async (req, res, next) => {
  const userId = req.params.id;
  const userType = req.body.userType;

  try {
    await userValidationMiddleware(req, res, async () => {
      await userManagementMiddleware(req, res, next, userType);
    });

    await tokenGeneratorMiddleware(req, res, async () => {
      const user = res.locals.user;
      const tokens = res.locals.tokens;

      user.refreshToken = tokens.refreshToken;
      await user.save();

      return res.status(200).json({
        message: `Usuario con rol ${userType} actualizado con éxito`,
        userType,
        user,
      });
    });
  } catch (error) {
    console.error(error);
    let errorMessage = `Error al actualizar usuario con rol ${userType}`;
    return res.status(500).json({ message: errorMessage });
  }
};

module.exports = userController;
