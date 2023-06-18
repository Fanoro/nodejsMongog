const express = require('express');
const router = express.Router();
const verifyMiddleware = require('../../middlewares/verify.middleware');
const userController = require('../../controllers/users/user.controller');
const checkPermissionMiddleware = require('../../middlewares/checkPermission.middleware');

// Función para definir las rutas según el rol y permisos
function defineRoutes(role, permissions) {
  const rolePath = `/${role.toLowerCase()}`;

  router.post(
    '/create_user',
    verifyMiddleware,
    checkPermissionMiddleware(['Gestión de Usuarios']),
    userController.createUser
  );

  router.get(
    `${rolePath}/all`,
    verifyMiddleware,
    checkPermissionMiddleware([`Get All ${role}`]),
    userController.getAllUser
  );

  router.get(
    `${rolePath}/:id`,
    verifyMiddleware,
    checkPermissionMiddleware([`Get ${role}`]),
    userController.getUser
  );

  router.put(
    `${rolePath}/:id`,
    verifyMiddleware,
    checkPermissionMiddleware([`Update ${role}`]),
    userController.updateUser
  );

  router.put(
    `${rolePath}/:id/desactivate`,
    verifyMiddleware,
    checkPermissionMiddleware([`Desactivate ${role}`]),
    userController.desactivateUser
  );

  router.put(
    `${rolePath}/:id/activate`,
    verifyMiddleware,
    checkPermissionMiddleware([`Activate ${role}`]),
    userController.activateUser
  );
}

// Rutas para administradores
defineRoutes('Administrator', [
  'Create Administrator',
  'Get All Administrator',
  'Get Administrator',
  'Update Administrator',
  'Desactivate Administrator',
  'Activate Administrator',
]);

// Rutas para técnicos
defineRoutes('Technician', [
  'Create Technician',
  'Get All Technician',
  'Get Technician',
  'Update Technician',
  'Desactivate Technician',
  'Activate Technician',
]);

// Rutas para encargados
defineRoutes('Supervisor', [
  'Create Supervisor',
  'Get All Supervisor',
  'Get Supervisor',
  'Update Supervisor',
  'Desactivate Supervisor',
  'Activate Supervisor',
]);

module.exports = router;

/*
// Rutas para productores semilleristas
router.post('/producer/create', userController.createUser);

// Rutas para productores externos
router.post('/external/create', userController.createUser);

// Rutas para clientes fugas
router.post('/client/create', userController.createUser);

// Rutas para responsables de institución
router.post('/institution/create', userController.createUser);


// Resto de las rutas/*

router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deactivateUser);
router.patch('/:id/activate', userController.activateUser);*/
