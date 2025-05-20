import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized. Please log in again." });
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      return res.status(401).json({ success: false, message: "Invalid token. Please log in again." });
    }

    // Check if the user is an admin
    if (decodedToken.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error in adminAuth middleware:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export default adminAuth;