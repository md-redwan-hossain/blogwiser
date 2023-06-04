import mongoose from "mongoose";

export const genericUserSchema = new mongoose.Schema<IUser>(
  {
    fullName: {
      type: String,
      required: [true, "An user must have a name."],
      maxLength: 50,
      trim: true
    },
    email: {
      type: String,
      required: [true, "An user must have a email."],
      lowercase: true,
      trim: true,
      maxLength: 50,
      unique: true
    },
    password: {
      type: String,
      required: [true, "An user must have a password."]
    },
    dateOfBirth: {
      type: Date,
      required: [true, "An user must have a dateOfBirth."]
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
      required: [true, "An user must have a gender."]
    },
    bio: {
      type: String,
      maxLength: 1500
    }
  },
  {
    timestamps: true,
    id: false,
    toJSON: {
      virtuals: true
    }
  }
);

const adminSchema = new mongoose.Schema<IUser>();

adminSchema.add(genericUserSchema).add({ role: { type: String, default: "admin" } });

const userManagementSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
      required: true
    },
    role: {
      type: String,
      required: true
    },

    isVerified: {
      type: Boolean,
      default: false
    },
    isDeactivated: {
      type: Boolean,
      default: false
    },
    isBanned: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    id: false,
    toJSON: {
      virtuals: true
    }
  }
);

export const UserManagement = mongoose.model("userManagement", userManagementSchema);

export const Admin = mongoose.model("Admin", adminSchema);
