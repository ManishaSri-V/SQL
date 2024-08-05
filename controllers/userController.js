const { User } = require("../models/userModel");

exports.getAllUsers = (req, res) => {
  try {
    User.findAll(async (err, users) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message });
      }

      res.status(200).json({
        success: true,
        data: users,
      });
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getUserById = (req, res) => {
  const { id } = req.params;
  try {
    User.findById(id, async (err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateUserById = (req, res) => {
  const { id } = req.params;
  const { name, email, password, role, age } = req.body;
  try {
    User.update(
      id,
      { name: name, email: email, password: password, role: role, age: age },
      async (err, update) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: err.message,
          });
        }

        res.status(200).json({
          success: true,
          data: update,
        });
      }
    );
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteUserById = (req, res) => {
  const { id } = req.params;
  try {
    User.delete(id, async (err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
