const express = require('express');
const router = express.Router();

const userController = require('../../controllers/users/user.controller');

// Rutas para administradores
router.post('/admin/create', userController.createUser);

// Rutas para técnicos
router.post('/technician/create', userController.createUser);

// Rutas para encargados
router.post('/supervisor/create', userController.createUser);

// Rutas para productores semilleristas
router.post('/producer/create', userController.createUser);

// Rutas para productores externos
router.post('/external/create', userController.createUser);

// Rutas para clientes fugas
router.post('/client/create', userController.createUser);

// Rutas para responsables de institución
router.post('/institution/create', userController.createUser);

/*// Resto de las rutas/*
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deactivateUser);
router.patch('/:id/activate', userController.activateUser);*/

module.exports = router;
