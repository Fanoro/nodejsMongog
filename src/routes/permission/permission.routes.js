const express = require("express");
const router = express.Router();
const verifyMiddleware = require("../../middlewares/verify.middleware");
const permissionsController = require("../../controllers/permissions/permission.controller");
const checkPermissionMiddleware = require("../../middlewares/checkPermission.middleware");
// Crear permiso
router.post(
  "/create_permission",
  verifyMiddleware,
  checkPermissionMiddleware(["Create Permission"]),
  permissionsController.createPermission
);

// Listar permisos
router.get(
  "/getAllp",
  verifyMiddleware,
  checkPermissionMiddleware(["Management Permissions"]),
  permissionsController.getAllPermissions
);

// Obtener permiso por ID
router.get(
  "/:id",
  verifyMiddleware,
  checkPermissionMiddleware(["Management Permissions"]),
  permissionsController.getPermission
);

// Actualizar permiso
router.put(
  "/:id",
  verifyMiddleware,
  checkPermissionMiddleware(["Update Permission"]),
  permissionsController.updatePermission
);

module.exports = router;
