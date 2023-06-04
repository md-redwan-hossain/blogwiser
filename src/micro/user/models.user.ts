import mongoose from "mongoose";
import { genericUserSchema } from "../admin/models.admin.js";

const userSchema = new mongoose.Schema<IUser>();

userSchema.add(genericUserSchema).add({ role: { type: String, default: "user" } });

export const User = mongoose.model("User", userSchema);
