const express = require('express');
const router = express.Router();
const verifyMiddleware = require('../../middlewares/verify.middleware');
const checkPermissionMiddleware = require('../../middlewares/checkPermission.middleware');
const rolesController = require('../../controllers/roles/role.controller');

// Crear rol
router.post(
  '/create_role',
  verifyMiddleware,
  checkPermissionMiddleware(['Management Roles']),
  rolesController.createRole
);

// Listar roles
router.get(
  '/getAllr',
  verifyMiddleware,
  checkPermissionMiddleware(['Get All Roles']),
  rolesController.getAllRoles
);

// Obtener rol por ID
router.get(
  '/:id',
  verifyMiddleware,
  checkPermissionMiddleware(['Management Roles']),
  rolesController.getRole
);

// Actualizar rol
router.put(
  '/:id',
  verifyMiddleware,
  checkPermissionMiddleware(['Management Roles']),
  rolesController.updateRole
);

module.exports = router;
