import { EventEmitter } from "node:events";

import mongoose from "mongoose";
import { UserManagement } from "./models.admin.js";

const adminEvent = new EventEmitter();

adminEvent.addListener(
  "newUserSignUp",
  async ({ userId, role }: { userId: mongoose.Types.ObjectId; role: string }) => {
    try {
      const newUser = new UserManagement({ userId, role });
      await newUser.save();
    } catch (err) {
      console.error(err);
    }
  }
);

export default adminEvent;
