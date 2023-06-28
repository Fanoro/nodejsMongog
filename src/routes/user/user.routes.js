const express = require('express');
const router = express.Router();
const verifyMiddleware = require('../../middlewares/verify.middleware');
const userController = require('../../controllers/users/user.controller');
const checkPermissionMiddleware = require('../../middlewares/checkPermission.middleware');

// Definir permisos para cada tipo de usuario
const adminPermissions = [
  'Create Administrator',
  'Get All Administrator',
  'Get Administrator',
  'Update Administrator',
  'Desactivate Administrator',
  'Activate Administrator',
];

const technicianPermissions = [
  'Create Technician',
  'Get All Technician',
  'Get Technician',
  'Update Technician',
  'Desactivate Technician',
  'Activate Technician',
];

const supervisorPermissions = [
  'Create Supervisor',
  'Get All Supervisor',
  'Get Supervisor',
  'Update Supervisor',
  'Desactivate Supervisor',
  'Activate Supervisor',
];

// Rutas para administradores
router.post(
  '/admin/create',
  verifyMiddleware,
  checkPermissionMiddleware(adminPermissions[0]),
  userController.createUser
);
router.get(
  '/admin/all',
  verifyMiddleware,
  checkPermissionMiddleware(adminPermissions[1]),
  userController.getAllUser
);
router.get(
  '/admin/:id',
  verifyMiddleware,
  checkPermissionMiddleware(adminPermissions[2]),
  userController.getUser
);
router.put(
  '/admin/:id',
  verifyMiddleware,
  checkPermissionMiddleware(adminPermissions[3]),
  userController.updateUser
);
router.put(
  '/admin/:id/desactivate',
  verifyMiddleware,
  checkPermissionMiddleware(adminPermissions[4]),
  userController.desactivateUser
);
router.put(
  '/admin/:id/activate',
  verifyMiddleware,
  checkPermissionMiddleware(adminPermissions[5]),
  userController.activateUser
);

// Rutas para técnicos
router.post(
  '/technician/create',
  verifyMiddleware,
  checkPermissionMiddleware(technicianPermissions[0]),
  userController.createUser
);
router.get(
  '/technician/all',
  verifyMiddleware,
  checkPermissionMiddleware(technicianPermissions[1]),
  userController.getAllUser
);
router.get(
  '/technician/:id',
  verifyMiddleware,
  checkPermissionMiddleware(technicianPermissions[2]),
  userController.getUser
);
router.put(
  '/technician/:id',
  verifyMiddleware,
  checkPermissionMiddleware(technicianPermissions[3]),
  userController.updateUser
);
router.put(
  '/technician/:id/desactivate',
  verifyMiddleware,
  checkPermissionMiddleware(technicianPermissions[4]),
  userController.desactivateUser
);
router.put(
  '/technician/:id/activate',
  verifyMiddleware,
  checkPermissionMiddleware(technicianPermissions[5]),
  userController.activateUser
);

// Rutas para encargados
router.post(
  '/supervisor/create',
  verifyMiddleware,
  checkPermissionMiddleware(supervisorPermissions[0]),
  userController.createUser
);
router.get(
  '/supervisor/all',
  verifyMiddleware,
  checkPermissionMiddleware(supervisorPermissions[1]),
  userController.getAllUser
);
router.get(
  '/supervisor/:id',
  verifyMiddleware,
  checkPermissionMiddleware(supervisorPermissions[2]),
  userController.getUser
);

router.put(
  '/supervisor/:id',
  verifyMiddleware,
  checkPermissionMiddleware(supervisorPermissions[3]),
  userController.updateUser
);
router.put(
  '/supervisor/:id/desactivate',
  verifyMiddleware,
  checkPermissionMiddleware(supervisorPermissions[4]),
  userController.desactivateUser
);
router.put(
  '/supervisor/:id/activate',
  verifyMiddleware,
  checkPermissionMiddleware(supervisorPermissions[5]),
  userController.activateUser
);

module.exports = router;
