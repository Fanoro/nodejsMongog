const express = require('express');
const router = express.Router();
const verifyMiddleware = require('../../middlewares/verify.middleware');
const userController = require('../../controllers/users/user.controller');
const checkPermissionMiddleware = require('../../middlewares/checkPermission.middleware');

// Rutas para encargados
router.post(
  '/create',
  verifyMiddleware,
  checkPermissionMiddleware([
    'Create Producer',
    'Create External',

  ]),
  userController.createUser
);
router.get('/:id', verifyMiddleware, userController.getUser);
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

module.exports = router;
