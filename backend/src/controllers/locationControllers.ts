import { Request, Response } from "express";
import Location from "../database/models/locationModel";
import User from "../database/models/userModel";

async function addLocation(req: Request, res: Response) {
  res.json({ msg: "Location has been added successfully" });
}

async function fetchLocation(req: Request, res: Response) {
  const userId = await User.findOne({ userId: "TestUser" });
  if (!userId) return res.json({ msg: "No user found" });
  const user = await Location.find({ userId: userId._id });
  res.json(user);
}

export default { fetchLocation, addLocation };
