const User = require("../models/User");

const getAllUsers = async (req, res) => {
     console.log(req);
  try {
    const users = await User.find({}, "-password"); // Exclude password field
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getAllUsers };
