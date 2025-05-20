import jwt from "jsonwebtoken";
import Artist from "../models/artistModel.js";

const artistAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized. Please log in again." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const artist = await Artist.findById(decoded.id);
    if (!artist) {
      return res.status(403).json({ success: false, message: "Access denied. Artists only." });
    }
    req.artist = artist;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export default artistAuth;