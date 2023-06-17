const express = require('express');
const router = express.Router();
const verifyMiddleware = require('../../middlewares/verify.middleware');
const userController = require('../../controllers/users/user.controller');
const checkPermissionMiddleware = require('../../middlewares/checkPermission.middleware');

// Rutas para técnicos
router.post(
  '/create',
  verifyMiddleware,
  checkPermissionMiddleware([
    'Create Technician', //// el tecnico aqui no deberia pdoer crearse automatico sino en admin crea credencales
    'Create Supervisor',
    'Create Producer',
    'Create External',
  ]),
  userController.createUser
);
router.put(
  '/:id',
  verifyMiddleware,
  checkPermissionMiddleware([
    'Create Supervisor',
    'Create Producer',
    'Create External',
  ]),
  userController.updateUser
);
router.get('/:id', verifyMiddleware, userController.getUser);
/*// Resto de las rutas/*

router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deactivateUser);
router.patch('/:id/activate', userController.activateUser);*/

module.exports = router;
