import jwt from "jsonwebtoken";
import { getUserSQL } from "./sql/usersSQL.js";

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    const user = await getUserSQL(_id);
    req.user = user._id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request not authorized" });
  }
};

export default requireAuth;
