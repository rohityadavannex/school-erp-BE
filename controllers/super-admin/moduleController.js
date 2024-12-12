const Modules = require("../../models/super-admin/modules");

exports.createModule = async (req, res) => {
  try {
    const { label, value } = req.body;
    await Modules.create({ label, value, status: true });
    res.send({ status: 201, message: "Module created." });
  } catch (err) {
    console.log("createModule controller ---> ", err);
    res.send({ status: 500, message: "Something went wrong." });
  }
};

exports.getModuleList = async (req, res) => {
  try {
    const data = await Modules.findAll();
    res.send({ status: 200, data });
  } catch (err) {
    res.send({ status: 500, message: "Something went wrong." });
  }
};
