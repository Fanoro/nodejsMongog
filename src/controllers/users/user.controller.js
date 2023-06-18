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
userController.getAllUser = async (req, res, next) => {
  try {
    let roleName = '';

    // Determinar el nombre del rol según la ruta
    if (req.path.includes('/admin/')) {
      roleName = 'Administrator';
    } else if (req.path.includes('/technician/')) {
      roleName = 'Technician';
    } else if (req.path.includes('/supervisor/')) {
      roleName = 'Supervisor';
    }

    const users = await User.aggregate([
      {
        $lookup: {
          from: 'roles',
          localField: 'role',
          foreignField: '_id',
          as: 'roleInfo',
        },
      },
      {
        $unwind: '$roleInfo',
      },
      {
        $match: {
          'roleInfo.name': roleName,
          isActive: true, // Agregar filtro para mostrar solo usuarios activos
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          isActive: 1,
          role: 1,
        },
      },
    ]);

    return res.status(200).json({
      message: 'Lista de usuarios obtenida con éxito',
      users,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Error al obtener la lista de usuarios' });
  }
};

userController.getUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).populate('role');

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (!user.isActive) {
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
userController.desactivateUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndUpdate(userId, { isActive: false });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    return res.status(200).json({ message: 'Usuario desactivado con éxito' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al desactivar usuario' });
  }
};

userController.activateUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndUpdate(userId, { isActive: true });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // No es necesario devolver el objeto de usuario actualizado en la respuesta
    return res.status(200).json({ message: 'Usuario activado con éxito' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al activar usuario' });
  }
};

module.exports = userController;
