const { where, Op } = require("sequelize");
const PlanAccess = require("../../models/super-admin/planAccess");
const Plans = require("../../models/super-admin/plans");
const { getPlainObjectFromSequelize } = require("../../helpers/helpers");
const { sequelize } = require("../../database/connection");

exports.createPlan = async (req, res) => {
  try {
    const { name, price, duration, features, active } = req.body;
    const plan = await Plans.create({
      name,
      price,
      duration,
      features,
      active,
    });

    const mappedFeatures = features.map((feature) => {
      return { planId: plan.id, name: feature };
    });

    await PlanAccess.bulkCreate(mappedFeatures);
    res.send({ status: 200, message: "Plan added." });
  } catch (err) {
    console.log("Something went wrong createPlan --> ", err);
    res.send({ status: 500, message: "Something went wrong." });
  }
};

exports.getPlanData = async (req, res) => {
  try {
    const { planId } = req.params;
    const accessData = await Plans.findOne({
      where: { id: planId },
      include: [{ model: PlanAccess, as: "planAccess" }],
    });

    if (!accessData) {
      res.send({ status: 200, data: {} });
      return;
    }

    res.send({
      status: 200,
      data: {
        ...accessData?.dataValues,
        features: accessData?.dataValues?.planAccess.map((item) => item.name),
      },
    });
  } catch (err) {
    console.log("get role data error getRoleData ", err);
    res.send({ status: 500, message: "Something went wrong." });
  }
};

exports.updatePlanData = async (req, res) => {
  try {
    const { planId } = req.params;
    const { name, price, duration, features, active } = req.body;

    await sequelize.transaction(async (transaction) => {
      await Plans.update(
        { name, price, duration, features, active },
        { where: { id: planId } },
        { transaction }
      );

      //delete previous features data
      await PlanAccess.destroy({ where: { planId } }, { transaction });

      const mappedFeatures = features.map((feature) => {
        return { planId, name: feature };
      });

      await PlanAccess.bulkCreate(mappedFeatures, { transaction });
    });

    res.send({ status: 200, message: "Plan updated." });
  } catch (err) {
    console.log("get role data error updatePlanData ", err);
    res.send({ status: 500, message: "Something went wrong." });
  }
};

exports.getPlansList = async (req, res) => {
  try {
    const query = req.query;
    const response = await Plans.findAndCountAll({
      limit: Number(query.length),
      offset: Number(query.offset),
      distinct: true,
      include: [{ model: PlanAccess, as: "planAccess" }],
      where: {
        name: {
          [Op.like]: `%${query.search}%`,
        },
      },
    });

    const plansData = getPlainObjectFromSequelize(response);

    const mappedRowsData = plansData.rows.map(({ planAccess, ...rest }) => {
      const modules = Array.from(new Set(planAccess.map((item) => item.name)));
      return { ...rest, features: modules };
    });

    res.send({
      status: 200,
      data: { count: plansData.count, rows: mappedRowsData },
    });
  } catch (err) {
    console.log("error deletePlan ", err);
    res.send({ status: 500, message: "Something went wrong." });
  }
};

exports.deletePlan = async (req, res) => {
  try {
    const { planId } = req.params;

    await Plans.destroy({ where: { id: planId } });
    await PlanAccess.destroy({ where: { planId } });

    res.send({ status: 200, message: "Deleted Plan." });
  } catch (err) {
    console.log("error deletePlan ", err);
    res.send({ status: 500, message: "Something went wrong." });
  }
};

exports.updatePlanStatus = async (req, res) => {
  try {
    const { planId } = req.params;
    const { status } = req.body;

    await Plans.update({ active: status }, { where: { id: planId } });
    res.send({ status: 200, message: "Plan Status Updated." });
  } catch (err) {
    console.log("error updatePlanStatus ", err);
    res.send({ status: 500, message: "Something went wrong." });
  }
};
