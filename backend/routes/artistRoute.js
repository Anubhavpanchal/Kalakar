import express from "express";
import { artistSignup, artistLogin, getArtistById } from "../controllers/artistController.js";

const artistRouter = express.Router();

artistRouter.post("/signup", artistSignup);
artistRouter.post("/login", artistLogin);
artistRouter.get("/:id", getArtistById); // <-- ye route hai jo artist ke ID se artist ko fetch karega


export default artistRouter;