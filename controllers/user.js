const { generateJwtToken, fsResultHandler } = require("../helpers/helpers");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { sendMail } = require("../utils/sendEmail");
const { v4: uuid } = require("uuid");
const { token } = require("morgan");
const Roles = require("../models/super-admin/roles");
const Permissions = require("../models/super-admin/permissions");
const moment = require("moment");
const fs = require("fs");

const brevo = require("@getbrevo/brevo");
const { sendEmail } = require("./email");
const {
  getVerifyRegisterEmailTemplate,
} = require("./user/email-templates/VerifyRegister");
const { FE_APP_URl } = require("../constants/constants");
const {
  getResetPasswordEmailTemplate,
} = require("./user/email-templates/ResetPassword");

exports.register = async (req, res) => {
  try {
    const {
      email,
      name,
      password,
      instituteName,
      instituteLogo,
      phone,
      image,
      address,
      country,
      state,
      city,
      district,
    } = req.body;
    const data = await User.findOne({ where: { email } });

    //if user exist and status is active
    if (data?.active) {
      res.send({ status: 409, message: "User with this email already exist." });
      return;
    }
    const verificationToken = uuid();
    const hashedPassword = bcrypt.hashSync(password, 10);
    await sendEmail(
      email,
      "Register Verification",
      getVerifyRegisterEmailTemplate(
        `${FE_APP_URl}/verify-email/${verificationToken}`
      )
    );

    //if user exist and status is not active
    if (data && !data.active) {
      await User.update(
        {
          name,
          password: hashedPassword,
          verifyToken: verificationToken,
          tokenTime: new Date(),
          instituteName, // Save the new field
          instituteLogo,
          phone,
          image,
          address,
          country,
          state,
          city,
          district,
        },
        {
          where: {
            id: data.id,
          },
        }
      );
      res.send({
        status: 200,
        message: "Sent verification email.",
        url: `${FE_APP_URl}/verify-email/${verificationToken}`,
      });
      return;
    }

    //if it's a new user
    await User.create({
      email,
      name,
      password: hashedPassword,
      verifyToken: verificationToken,
      tokenTime: new Date(),
      instituteName, // Save the new field
      instituteLogo,
      phone,
      image,
      address,
      country,
      state,
      city,
      district,
    });
    res.send({ status: 200, message: "Sent verification email." });
  } catch (err) {
    console.log("line 55 register controller", err);
    res.send({ status: 500, message: "Something went wrong.", error: err });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await User.findOne({ where: { email, active: true } });
    if (!data) {
      res.send({ status: 404, message: "Account doesn't exist." });
      return;
    }
    const userData = await bcrypt.compare(password, data.password);
    if (!userData) {
      res.send({ status: 403, message: "Invalid email or password", data });
      return;
    }
    const token = generateJwtToken(data.id);
    res.send({ status: 200, data: { ...data.dataValues, token } });
  } catch (err) {
    res.send({ status: 500, message: "Something went wrong.", error: err });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const data = await User.findOne({ where: { email, active: true } });
    if (!data) {
      res.send({ status: 404, message: "Account doesn't exist." });
      return;
    }

    const verificationToken = uuid();

    await User.update(
      {
        verifyToken: verificationToken,
        tokenTime: new Date(),
      },
      {
        where: {
          id: data.id,
        },
      }
    );

    await sendEmail(
      email,
      "Reset Password",
      getResetPasswordEmailTemplate(
        `${FE_APP_URl}/reset-password/${verificationToken}`
      )
    );

    res.send({ status: 200, message: "Email sent." });
  } catch (err) {
    res.send({ status: 500, message: "Something went wrong.", error: err });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { password, token } = req.body;
    const data = await User.findOne({ where: { verifyToken: token } });

    if (!data) {
      res.send({ status: 400, message: "Invalid Token." });
      return;
    }

    if (moment().unix() - moment(data.tokenTime).unix() > 900) {
      res.send({ status: 401, message: "Token Expired." });
      return;
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    await User.update(
      { password: hashedPassword, verifyToken: null },
      { where: { verifyToken: token } }
    );
    res.send({ status: 200, message: "Reset password." });
  } catch (err) {
    res.send({ status: 500, message: "Something went wrong.", error: err });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const data = await User.findOne({ where: { id: req.userId } });
    res.send({ status: 200, data });
  } catch (err) {
    res.send({ status: 500, message: "Something went wrong.", error: err });
  }
};

exports.updateUserInfo = async (req, res) => {
  try {
    const {
      name,
      instituteName,
      instituteLogo,
      phone,
      image,
      address,
      country,
      state,
      city,
      district,
    } = req.body;

    const user = await User.findOne({ where: { id: req.userId } });

    if (!user) {
      res.send({ status: 404, message: "Not Found." });
      return;
    }

    if (req?.file?.filename) {
      fs.unlink(
        `${process.cwd()}/public/my-uploads/${user.get("image")}`,
        fsResultHandler
      );
    }
    if (req?.file?.instituteLogo) {
      fs.unlink(
        `${process.cwd()}/public/my-uploads/${user.get("instituteLogo")}`,
        fsResultHandler
      );
    }

    await User.update(
      {
        name,
        instituteName, // Save the new field
        phone,
        image,
        address,
        country,
        state,
        city,
        district,
        image: req.files?.image?.[0]?.filename,
        instituteLogo: req.files?.instituteLogo?.[0]?.filename,
      },
      { where: { id: req.userId } }
    );
    const data = await User.findOne({
      attributes: {
        exclude: ["password", "verifyToken", "tokenTime"],
      },
      where: { id: req.userId },
    });
    res.send({ status: 200, data });
  } catch (err) {
    console.log("Update user info error --------------> ", err);
    res.send({ status: 500, message: "Something went wrong.", error: err });
  }
};

//get role access
exports.getRoleAccess = async (req, res) => {
  try {
    const { roleId } = req.params;
    const accessData = await Roles.findOne({
      where: { id: roleId },
      include: [
        {
          model: Permissions,
          as: "permissions",
          // include: { model: ModuleAccess, as: "moduleAccess" },
        },
      ],
    });

    res.send({ status: 200, data: accessData });
  } catch (err) {
    console.log("getRoleAccess controller ==> ", err);
    res.send({ status: 500, message: "Something went wrong.", error: err });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;
    const data = await User.findOne({ where: { verifyToken: token } });

    if (!data) {
      res.send({ status: 400, message: "Invalid Token." });
      return;
    }

    if (moment().unix() - moment(data.tokenTime).unix() > 900) {
      res.send({ status: 401, message: "Token Expired." });
      return;
    }
    await User.update(
      { verifyToken: null, active: true },
      { where: { verifyToken: token } }
    );
    res.send({ status: 200, message: "Email verified." });
  } catch (err) {
    console.log("verifyEmail controller ==> ", err);
    res.send({ status: 500, message: "Something went wrong.", error: err });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    const data = await User.findOne({ where: { id: req.userId } });

    if (!data) {
      res.send({ status: 404, message: "Not Found." });
      return;
    }

    const isEqual = await bcrypt.compare(password, data.get("password"));

    if (!isEqual) {
      res.send({ status: 400, message: "Bad Request." });
      return;
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    await User.update(
      { password: hashedPassword },
      { where: { id: req.userId } }
    );
    res.send({ status: 200, message: "Password Updated." });
  } catch (err) {
    console.log("Update Password error --------------> ", err);
    res.send({ status: 500, message: "Something went wrong.", error: err });
  }
};
