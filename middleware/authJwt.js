import jwt from "jsonwebtoken";
import { secret } from "../config/index.js";

const verifyToken = (req, res, next) => {
  const token = req.body.token;
  console.log(token);

  if (!token) {
    return res.status(403).json({ message: "No token provided!" });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

export default verifyToken;
