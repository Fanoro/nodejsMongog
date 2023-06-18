const express = require('express');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
const ExpressApp = express();
const cors = require('cors');

require('./config/database');
const { PORT, LOCALHOST } = require('./config/config');

ExpressApp.use(bodyParser.json());
ExpressApp.use(express.json());
ExpressApp.use(express.text());
ExpressApp.use(cookieParser());

ExpressApp.use(cors({ origin: '*' }));

//routes
const authRoutes = require('./routes/auth/auth.routes');

const usersRoutes = require('./routes/user/user.routes');

const permissionsRoutes = require('./routes/permission/permission.routes');
const rolesRoutes = require('./routes/role/role.routes');

//const especiesRoutes = require('./routes/service/specie.routes');
ExpressApp.use('/permissions', permissionsRoutes);
ExpressApp.use('/roles', rolesRoutes);
ExpressApp.use('/auth', authRoutes);
ExpressApp.use('/', usersRoutes);

//ExpressApp.use('/species', especiesRoutes);
ExpressApp.listen(PORT, LOCALHOST, () => {
  console.log(`Server is running on http://${LOCALHOST}:${PORT}`);
});
