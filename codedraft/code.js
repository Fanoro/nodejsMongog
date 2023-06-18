const express = require('express');
const router = express.Router();
const verifyMiddleware = require('../../middlewares/verify.middleware');
const userController = require('../../controllers/users/user.controller');
const checkPermissionMiddleware = require('../../middlewares/checkPermission.middleware');

// Función para definir las rutas para un determinado tipo de usuario
const defineUserRoutes = (
  roleName,
  createPermission,
  getPermission,
  updatePermission
) => {
  router.post(
    `/${roleName.toLowerCase()}/create`,
    verifyMiddleware,
    checkPermissionMiddleware([createPermission]),
    userController.createUser
  );

  router.get(
    `/${roleName.toLowerCase()}/all`,
    verifyMiddleware,
    checkPermissionMiddleware([getPermission]),
    userController.getAllUser
  );

  router.get(
    `/${roleName.toLowerCase()}/:id`,
    verifyMiddleware,
    checkPermissionMiddleware([getPermission]),
    userController.getUser
  );

  router.put(
    `/${roleName.toLowerCase()}/:id`,
    verifyMiddleware,
    checkPermissionMiddleware([updatePermission]),
    userController.updateUser
  );
};

// Rutas para administradores
defineUserRoutes(
  'Administrator',
  'Create Administrator',
  'Get All Administrator',
  'Update Administrator'
);

// Rutas para técnicos
defineUserRoutes(
  'Technician',
  'Create Technician',
  'Get All Technician',
  'Update Technician'
);

// Rutas para encargados
defineUserRoutes(
  'Supervisor',
  'Create Supervisor',
  'Get All Supervisor',
  'Update Supervisor'
);

module.exports = router;
