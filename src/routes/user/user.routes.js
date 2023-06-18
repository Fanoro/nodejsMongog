const express = require('express');
const router = express.Router();
const verifyMiddleware = require('../../middlewares/verify.middleware');
const userController = require('../../controllers/users/user.controller');
const checkPermissionMiddleware = require('../../middlewares/checkPermission.middleware');

// Rutas para administradores
router.post(
  '/admin/create',
  verifyMiddleware,
  checkPermissionMiddleware(['Create Administrator']),
  userController.createUser
);
router.get(
  '/admin/all',
  verifyMiddleware,
  checkPermissionMiddleware(['Get All Administrator']),
  userController.getAllUser
);
router.get(
  '/admin/:id',
  verifyMiddleware,
  checkPermissionMiddleware(['Get Administrator']),
  userController.getUser
);
router.put(
  '/admin/:id',
  verifyMiddleware,
  checkPermissionMiddleware(['Update Administrator']),
  userController.updateUser
);

// Rutas para técnicos
router.post(
  '/technician/create',
  verifyMiddleware,
  checkPermissionMiddleware(['Create Technician']),
  userController.createUser
);
router.get(
  '/technician/all',
  verifyMiddleware,
  checkPermissionMiddleware(['Get All Technician']),
  userController.getAllUser
);
router.get(
  '/technician/:id',
  verifyMiddleware,
  checkPermissionMiddleware(['Get Technician']),
  userController.getUser
);
router.put(
  '/technician/:id',
  verifyMiddleware,
  checkPermissionMiddleware(['Update Technician']),
  userController.updateUser
);

// Rutas para encargados
router.post(
  '/supervisor/create',
  verifyMiddleware,
  checkPermissionMiddleware(['Create Supervisor']),
  userController.createUser
);
router.get(
  '/supervisor/all',
  verifyMiddleware,
  checkPermissionMiddleware(['Get All Supervisor']),
  userController.getAllUser
);
router.get(
  '/supervisor/:id',
  verifyMiddleware,
  checkPermissionMiddleware(['Get Supervisor']),
  userController.getUser
);

router.put(
  '/supervisor/:id',
  verifyMiddleware,
  checkPermissionMiddleware(['Update Supervisor']),
  userController.updateUser
);
router.get(
  '/supervisor/:id',
  verifyMiddleware,
  checkPermissionMiddleware(['Get Supervisor']),
  userController.getUser
);

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
