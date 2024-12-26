const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const fs = require("fs");
const User = require("../../models/user");

exports.createUser = async (req, res) => {
  console.log("create user");
  try {
    const {
      name,
      email,
      password = "12345",
      phone,
      alternatePhone,
      address,
      state,
      city,
      country,
      active,
    } = req.body;
    const data = await User.findOne({ where: { email } });

    console.log("line 23 ", alternatePhone, typeof alternatePhone);

    //if user exist and status is active
    if (data?.active) {
      res.send({ status: 409, message: "User with this email already exist." });
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const image = req.files?.image?.[0]?.filename;
    const instituteLogo = req.files?.instituteLogo?.[0]?.filename;

    //if it's a new user
    await User.create({
      email,
      name,
      password: hashedPassword,
      active: true,
      phone,
      alternatePhone: alternatePhone,
      address,
      state,
      city,
      country,
      active,
      image: image,
      instituteLogo: instituteLogo,
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
      res.send({ status: 403, message: "Permission denied." });
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

exports.updateUserStatus = async (req, res) => {
  try {
    const { active, userId } = req.body;

    const data = await User.findOne({ where: { id: userId } });

    if (Number(data?.id) !== Number(userId)) {
      res.send({ status: 403, message: "Permission denied." });
      return;
    }
    await User.update(
      {
        active,
      },
      { where: { id: userId } }
    );
    res.send({ status: 200, message: "User status updated." });
  } catch (err) {
    console.log("updateUserStatus controller ==> ", err);
    res.send({ status: 500, message: "Something went wrong.", error: err });
  }
};
//to get all the users
exports.getAllUsers = async (req, res) => {
  try {
    const { search = "", offset = 0, length = 10 } = req.query;
    const data = req.query;
    const userData = await User.findAndCountAll({
      limit: Number(length),
      offset: Number(offset),
      attributes: {
        exclude: [
          "password",
          "verifyToken",
          "tokenTime",
          "createdAt",
          "updatedAt",
        ],
      },
      where: {
        name: {
          [Op.like]: `%${search}%`,
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
