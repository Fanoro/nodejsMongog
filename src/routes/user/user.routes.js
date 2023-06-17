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
router.put(
  '/admin/:id',
  verifyMiddleware,
  checkPermissionMiddleware(['Update Administrator']),
  userController.updateUser
);

router.get(
  '/admin/:id',
  verifyMiddleware,
  checkPermissionMiddleware(['Get Administrator']),
  userController.getUser
);
// Rutas para técnicos
router.post(
  '/technician/create',
  verifyMiddleware,
  checkPermissionMiddleware([
    'Create Technician',
    /*  'Create Supervisor',
    'Create Producer',
    'Create External',*/
  ]),
  userController.createUser
);
router.put(
  '/technician/:id',
  verifyMiddleware,
  checkPermissionMiddleware([
    'Create Supervisor',
    'Create Producer',
    'Create External',
  ]),
  userController.updateUser
);
router.get(
  '/technician/:id',
  verifyMiddleware,
  checkPermissionMiddleware(['Get Technician']),
  userController.getUser
);
// Rutas para encargados
router.post(
  '/supervisor/create',
  verifyMiddleware,
  checkPermissionMiddleware(['Create Supervisor']),
  userController.createUser
);
router.get(
  '/supervisor/:id',
  verifyMiddleware,
  checkPermissionMiddleware(['Get Supervisor']),
  userController.getUser
);
/*router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deactivateUser);Get Supervisor
router.patch('/:id/activate', userController.activateUser);*/

module.exports = router;
