import User from "./model.user.js";
import config from "../../config/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// signing up a new account
const signUp = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username: username }).exec((err, user) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }

    if (!(user && user._id))
      User.create({ username: username, password: bcrypt.hashSync(password, 10) }, (err, newUser) => {
        if (err) {
          res.status(500).json({ message: err });
          return;
        }

        const sessionUser = { userId: newUser._id, username: newUser.username };
        req.session.user = sessionUser;
        res.status(200).json({
          user: sessionUser,
          message: "User was registered successfully!",
          status: 200,
        });
      });
    else res.status(202).json({ message: "Account already existed!", status: 202 });
  });
};

// logging an existing account
const logIn = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username: username }).exec((err, user) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }

    if (!(user && user._id)) {
      return res.status(202).json({ message: "User Not found.", status: 202 });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(202).json({
        accessToken: null,
        message: "Invalid Password!",
        status: 202,
      });
    }

    const sessionUser = { userId: user._id, username: user.username };
    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: config.sessLifeTime, // 10 days
    });

    req.session.user = sessionUser;
    req.session.token = token;
    res.status(200).json({
      user: sessionUser,
      accessToken: token,
      status: 200,
      message: "You have logged in successfully!"
    });
  });
};

// DELETE /logout
const logOut = (req, res, next) => {
  if (req.session.user) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.json({ message: "Session has been deleted!" });
      }
    });
  }
};

const getUser = (req, res) => {
  const sessionUser = req.body.sessionUser

  if (sessionUser) {
    res.json({ user: sessionUser });
  }
};

export default {
  logIn,
  logOut,
  signUp,
  getUser,
};
