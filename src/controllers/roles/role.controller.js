const Role = require('../../models/role/role.model');
const Permission = require('../../models/permission/permission.model');
const roleController = {};

roleController.createRole = async (req, res) => {
  try {
    const { name, isActive, permissions } = req.body;

    const role = await Role.create({
      name,
      isActive,
      permissions,
    });

    const roleWithPermissions = await Role.findById(role._id).populate({
      path: 'permissions',
      select: '_id alias',
    });

    return res
      .status(201)
      .json({ message: 'Rol creado con éxito', role: roleWithPermissions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al crear rol' });
  }
};

roleController.getAllRoles = async (req, res, next) => {
  try {
    const roles = await Role.find();
    res.status(200).json({ success: true, data: roles });
  } catch (error) {
    next(error);
  }
};

roleController.getRole = async (req, res, next) => {
  try {
    const role = await Role.findById(req.params.id).populate(
      'permissions',
      '_id alias'
    );
    if (!role) {
      return res
        .status(404)
        .json({ success: false, message: 'Role not found' });
    }

    const roleWithAliases = {
      _id: role._id,
      name: role.name,
      permissions: role.permissions.map((permission) => ({
        _id: permission._id,
        alias: permission.alias,
      })),
      isActive: role.isActive,
      __v: role.__v,
    };

    res.status(200).json({ success: true, data: roleWithAliases });
  } catch (error) {
    next(error);
  }
};

roleController.updateRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { permissions } = req.body;

    const role = await Role.findById(id).populate('permissions', '_id');

    if (!role) {
      return res
        .status(404)
        .json({ success: false, message: 'Role not found' });
    }

    // Verificar si se proporcionó una matriz completa de permisos
    if (Array.isArray(permissions)) {
      // Actualizar los permisos según la matriz proporcionada
      const updatedPermissions = await Permission.find(
        { _id: { $in: permissions } },
        '_id alias'
      );
      role.permissions = updatedPermissions;
    } else {
      // Actualizar los permisos uno por uno
      for (const permissionId of permissions) {
        // Verificar si el permiso ya existe en el rol
        const existingPermission = role.permissions.find(
          (permission) => permission._id.toString() === permissionId
        );
        if (!existingPermission) {
          // Si no existe, agregar el permiso al rol
          const newPermission = await Permission.findById(permissionId);
          if (newPermission) {
            role.permissions.push(newPermission);
          }
        }
      }
    }

    await role.save();

    const roleWithAliases = {
      _id: role._id,
      name: role.name,
      permissions: role.permissions.map((permission) => ({
        _id: permission._id,
        alias: permission.alias,
      })),
      isActive: role.isActive,
      __v: role.__v,
    };

    res.status(200).json({ success: true, data: roleWithAliases });
  } catch (error) {
    next(error);
  }
};

module.exports = roleController;
