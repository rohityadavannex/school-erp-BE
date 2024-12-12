const { Op } = require("sequelize");
const Permissions = require("../../models/super-admin/permissions");
const Roles = require("../../models/super-admin/roles");

exports.createRole = async (req, res) => {
  try {
    const { name, permissions, active } = req.body;
    const role = await Roles.create({ name, createdBy: req.userId, active });

    const allPermissions = [];

    Object.keys(permissions).forEach((feature) => {
      const featurePermission = permissions[feature];
      const mappedPermission = featurePermission.map((permission) => {
        return {
          roleId: role.id,
          moduleName: feature,
          type: permission,
        };
      });
      allPermissions.push(...mappedPermission);
    });
    await Permissions.bulkCreate(allPermissions);
    res.send({ status: 200, message: "Role added." });
  } catch (err) {
    res.send({ status: 500, message: "Something went wrong." });
  }
};

exports.getRoleData = async (req, res) => {
  try {
    const { roleId } = req.params;
    const accessData = await Roles.findOne({
      where: { id: roleId },
      include: [{ model: Permissions, as: "permissions" }],
    });
    const modules = Array.from(
      new Set(accessData.permissions.map((item) => item.moduleName))
    );

    const updatedPermissions = {};

    modules.forEach((item) => {
      updatedPermissions[item] = accessData.permissions
        .filter((permission) => permission.moduleName === item)
        .map((permission) => permission.type);
    });

    res.send({
      status: 200,
      data: { ...accessData.dataValues, permissions: updatedPermissions },
    });
  } catch (err) {
    console.log("get role data error getRoleData ", err);
    res.send({ status: 500, message: "Something went wrong." });
  }
};

exports.updateRoleData = async (req, res) => {
  try {
    const { roleId } = req.params;
    const { name, permissions, active } = req.body;

    //Delete previous data
    await Roles.update({ name, active }, { where: { id: roleId } });
    await Permissions.destroy({ where: { roleId } });

    const allPermissions = [];

    Object.keys(permissions).forEach((feature) => {
      const featurePermission = permissions[feature];
      const mappedPermission = featurePermission.map((permission) => {
        return {
          roleId,
          moduleName: feature,
          type: permission,
        };
      });
      allPermissions.push(...mappedPermission);
    });
    await Permissions.bulkCreate(allPermissions);

    res.send({ status: 200, message: "Updated Role." });
  } catch (err) {
    console.log("get role data error updateRoleData ", err);
    res.send({ status: 500, message: "Something went wrong." });
  }
};

exports.getRolesList = async (req, res) => {
  try {
    const query = req.query;

    const data = await Roles.findAndCountAll({
      ...(query?.length ? { limit: Number(query.length) } : {}),
      ...(query?.offset ? { offset: Number(query.offset) } : {}),
      where: {
        ...(query?.search
          ? {
              name: {
                [Op.like]: `%${query.search}%`,
              },
            }
          : {}),
        createdBy: 1,
      },
      distinct: true,
      include: [{ model: Permissions, as: "permissions" }],
    });
    const rolesData = JSON.parse(JSON.stringify(data));

    const mappedRowsData = rolesData.rows.map((role) => {
      const modules = Array.from(
        new Set(role.permissions.map((item) => item.moduleName))
      );
      return { ...role, permissions: modules };
    });

    res.send({
      status: 200,
      data: { count: rolesData.count, rows: mappedRowsData },
    });
  } catch (err) {
    console.log("get role data error getRolesList ", err);
    res.send({ status: 500, message: "Something went wrong." });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const { roleId } = req.params;

    //We can not delete Admin role.
    if (roleId === 2) {
      res.send({ status: 404, message: "Bad Request." });
      return;
    }

    await Roles.destroy({ where: { id: roleId } });
    await Permissions.destroy({ where: { roleId } });

    res.send({ status: 200, message: "Deleted Role." });
  } catch (err) {
    console.log("get role data error updateRoleData ", err);
    res.send({ status: 500, message: "Something went wrong." });
  }
};

exports.updateRoleStatus = async (req, res) => {
  try {
    const { roleId } = req.params;
    const { status } = req.body;

    await Roles.update({ active: status }, { where: { id: roleId } });
    res.send({ status: 200, message: "Role Status Updated." });
  } catch (err) {
    console.log("error updatePlanStatus ", err);
    res.send({ status: 500, message: "Something went wrong." });
  }
};
