const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const User = require("../../models/user");

exports.createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      alternatePhone,
      address,
      state,
      city,
      country,
      active,
    } = req.body;
    const data = await User.findOne({ where: { email } });

    //if user exist and status is active
    if (data?.active) {
      res.send({ status: 409, message: "User with this email already exist." });
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    //if it's a new user
    await User.create({
      email,
      name,
      password: hashedPassword,
      active: true,
      phone,
      alternatePhone,
      address,
      state,
      city,
      country,
      active,
    });

    res.send({ status: 200, message: "User added." });
  } catch (err) {
    console.log("createUser controller ==> ", err);
    res.send({ status: 500, message: "Something went wrong." });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      name,
      email,
      password,
      phone,
      alternatePhone,
      address,
      state,
      city,
      country,
      active,
    } = req.body;

    const data = await User.findOne({ where: { email } });

    if (Number(data?.id) !== Number(userId)) {
      res.send({ status: 403, message: "Email is already in use." });
      return;
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    await User.update(
      {
        name,
        email,
        phone,
        alternatePhone,
        address,
        state,
        city,
        country,
        password: hashedPassword,
        active,
      },
      { where: { id: userId } }
    );
    res.send({ status: 200, message: "User updated." });
  } catch (err) {
    console.log("updateUser controller ==> ", err);
    res.send({ status: 500, message: "Something went wrong.", error: err });
  }
};

//to get all the users
exports.getAllUsers = async (req, res) => {
  try {
    const data = req.query;
    const userData = await User.findAndCountAll({
      limit: Number(data.length),
      offset: Number(data.offset),
      where: {
        name: {
          [Op.like]: `%${data.search}%`,
        },
        role: {
          [Op.not]: 1,
        },
      },
    });

    res.send({
      status: 200,
      data: userData,
    });
  } catch (err) {
    console.log("getUsers controller --> ", err);
    res.send({ status: 500, message: "Something went wrong." });
  }
};

//GET user info based on user id
exports.getUserInfo = async (req, res) => {
  try {
    const { userId } = req.params;
    const usersData = await User.findOne({ where: { id: userId } });

    res.send({
      status: 200,
      data: usersData,
    });
  } catch (err) {
    res.send({ status: 500, message: "Something went wrong.", error: err });
  }
};
