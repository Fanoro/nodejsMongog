const User = require('../models/user/user.model');
const Role = require('../models/role/role.model');
const bcrypt = require('bcrypt');
const verifyMiddleware = require('../middlewares/verify.middleware');
const checkPermissionMiddleware = require('../middlewares/checkPermission.middleware');

const userManagementMiddleware = async (req, res, next, userType) => {
  try {
    const { name, email, password, isActive, role } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const roleObject = await Role.findById(role);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isActive,
      role: [roleObject],
    });

    const userWithRole = await User.findById(user._id)
      .populate({
        path: 'role',
        populate: {
          path: 'permissions',
          select: '_id alias',
        },
      })
      .select('-password');

    res.locals.user = userWithRole;

    // Realizar acciones específicas según el tipo de usuario
    switch (userType) {
      case 'admin':
        break;
      case 'technician':
        break;
      case 'supervisor':
        break;
      case 'producer':
      case 'external':
      case 'client':
      case 'institution':
      default:
        // Para los casos restantes, simplemente llamar a `next()`
        next();
        break;
    }
  } catch (error) {
    console.error(error);
    if (error.name === 'MongoServerError' && error.code === 11000) {
      return res
        .status(400)
        .json({ message: 'El correo electrónico ya está registrado' });
    }
    return res.status(500).json({ message: 'Error al crear usuario' });
  }
};

module.exports = userManagementMiddleware;
