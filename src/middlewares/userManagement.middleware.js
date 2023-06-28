const User = require('../models/user/user.model');
const bcrypt = require('bcrypt');

const userManagementMiddleware = async (req, res, next, userType) => {
  try {
    const { name, email, password, isActive, role } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let user;

    if (req.params.id) {
      // Si hay un ID en los parámetros, buscar el usuario existente por su ID
      user = await User.findById(req.params.id);
    } else {
      // Si no hay ID en los parámetros, crear un nuevo usuario
      user = new User();
    }

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    user.name = name;
    user.email = email;
    user.password = hashedPassword;
    user.isActive = isActive;
    user.role = [role];

    const updatedUser = await user.save();

    const userWithRole = await User.findById(updatedUser._id)
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
        // Lógica específica para el tipo de usuario "admin"
        break;
      case 'technician':
        // Lógica específica para el tipo de usuario "technician"
        break;
      case 'supervisor':
        // Lógica específica para el tipo de usuario "supervisor"
        break;
      case 'producer':
        // Lógica específica para el tipo de usuario "producer"
        break;
      case 'external':
        // Lógica específica para el tipo de usuario "external"
        break;
      case 'client':
        // Lógica específica para el tipo de usuario "client"
        break;
      case 'institution':
        // Lógica específica para el tipo de usuario "institution"
        break;
      default:
        // Para los casos restantes, simplemente llamar a `next()`
        break;
    }

    next(); // Llamar a next() para pasar la ejecución al siguiente middleware o controlador
  } catch (error) {
    console.error(error);
    if (error.name === 'MongoServerError' && error.code === 11000) {
      return res
        .status(400)
        .json({ message: 'El correo electrónico ya está registrado' });
    }
    return res.status(500).json({ message: 'Error al actualizar usuario' });
  }
};

module.exports = userManagementMiddleware;
