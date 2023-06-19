/*const express = require('express');
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
import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import PageBody from '../../../../components/common/PageBody';
import { useStyles } from './discharge.styles';
import { getAllTechnicians } from '../../../../actions/technician';

const Discharge = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const technicians = useSelector((state) => state.user.users);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    dispatch(getAllTechnicians());
  }, [dispatch]);

  return (
    <Box>
      <PageBody>
        <Box className={classes.content_body}>
          <h1>Tecnicos</h1>
          {error && <p>Error: {error}</p>}
          <ul>
            {technicians.map((technicians) => (
              <li key={technicians.id}>{technicians.name}</li>
            ))}
          </ul>
        </Box>
      </PageBody>
    </Box>
  );
};

export default Discharge;


import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import PageBody from '../../../../components/common/PageBody';
import { useStyles } from './extern.styles';
import { getAllAdmins } from '../../../../actions/admin';

const Extern = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.user.users);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    dispatch(getAllAdmins());
  }, [dispatch]);

  return (
    <Box>
      <PageBody>
        <Box className={classes.content_body}>
          <h1>Administradores</h1>
          {error && <p>Error: {error}</p>}
          <ul>
            {admins.map((admin) => (
              <li key={admin.id}>{admin.name}</li>
            ))}
          </ul>
        </Box>
      </PageBody>
    </Box>
  );
};

export default Extern;*/
