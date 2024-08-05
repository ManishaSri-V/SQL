const bcrypt = require("bcryptjs");
const { User } = require("../models/userModel");
//const Activity = require("../models/activityModel");
const { generateToken } = require("../config/auth");

exports.register = async (req, res) => {
  const { name, email, password, role, age } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    User.create(
      { name, email, password: hashedPassword, role, age },
      async (err, user) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ success: false, message: err.message });
        }

        const token = generateToken(user);

        res.status(201).json({
          success: true,
          token: token,
          data: user,
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

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    User.findByEmail(email, async (err, user) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ success: false, message: "Server error" });
      }

      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }

      const checkPasswordMatching = await bcrypt.compare(
        password,
        user.password
      );

      if (!checkPasswordMatching) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }

      const token = generateToken(user);

      res.status(200).json({
        success: true,
        token: token,
        data: user,
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/*exports.activityRegister = async (req, res) => {
  const { userId, action, description } = req.body;

  try {
    Activity.log({ userId, action, description }, async (err, activity) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message });
      }

      const token = generateToken(activity);

      res.status(201).json({
        success: true,
        token: token,
        data: activity,
      });
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};*/
