const User = require("../schema/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { password, email } = req.body;
  let userExist, matchPass, accessToken;
  try {
    userExist = await User.findOne({ email: email });
    if (userExist == null) {
      return res.send({ status: 0, response: "User not exist" });
    }
    matchPass = await bcrypt.compare(password, userExist.password);
    if (matchPass === false) {
      return res.send({ status: 0, response: "Password doesn't match" });
    }
    accessToken = jwt.sign(
      {
        user: {
          userId: userExist._id,
          email: userExist.email,
          role: userExist.role,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: "10h" }
    );

    return res.status(200).send({
      status: 1,
      response: "Logged in Successfully",
      token: accessToken,
    });
  } catch (error) {
    res.send({ status: 0, response: error.message });
  }
};

const logoutUser = async (req, res) => {
  let { userId } = req.body, data = { status: 0, response: "Invalid request" }, userExist;
  try {
    userExist = await User.findOne({ _id: userId });
    if (userExist == null) {
      return res.status(400).send(data);
    }
     res.status(200).send({ status: 1, response: "Logged out in Successfully" });
  } catch (error) {
    res.status(500).send({ status: 0, response: error.message });
  }
};

const getAllUsers = async (req, res) => {
  let users, data = { status: 0, response: "Invalid request" }
  try {
    users = await User.find({ role: 1}, {password: 0, createdAt: 0, updatedAt: 0, role: 0});
    if(users){

      return res.status(200).send({ status: 1, data: JSON.stringify(users) });
    }
    res.send(data)
  } catch (error) {
    res.status(500).send({ status: 0, response: error.message });
  }
};

module.exports = {
  loginUser,
  logoutUser,
  getAllUsers
};
