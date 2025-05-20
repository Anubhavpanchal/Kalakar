import Artist from "../models/artistModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const artistSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ success: false, message: "All fields required" });

    const exists = await Artist.findOne({ email });
    if (exists)
      return res.status(400).json({ success: false, message: "Artist already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const artist = new Artist({ name, email, password: hashedPassword });
    await artist.save();

    res.json({ success: true, message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const artistLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const artist = await Artist.findOne({ email });
    if (!artist)
      return res.status(400).json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, artist.password);
    if (!isMatch)
      return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: artist._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ success: true, token, artist: { id: artist._id, name: artist.name, email: artist.email } });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getArtistById = async (req, res) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findById(id);
    if (!artist) {
      return res.status(404).json({ success: false, message: "Artist not found" });
    }
    res.json({ success: true, artist });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};