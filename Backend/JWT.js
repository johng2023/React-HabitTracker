import jwt from "jsonwebtoken";
import "dotenv/config";

export default function verifyUser(req, res, next) {
  const header = req.header("Authorization");
  if (!header) {
    return res.json({ message: "Access Denied" });
  }

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.json({ message: error.message });
  }
}
