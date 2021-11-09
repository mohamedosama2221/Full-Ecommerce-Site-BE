const mongoose = require("mongoose");
const validator = require("validator");
const User = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a valid name"],
      minlength: [3, "username can't be less than 3 characters"],
      maxlength: [15, "username can't exceed 15 characters"],
    },

    email: {
      type: String,
      required: [true, "Email can't be empty"],
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },

    password: {
      type: String,
      required: [true, "Please Enter a password"],
      minlength: [8, "Your password must be at least 8 characters"],
    },

    avatar: {
      required: [true, "Please add a profile image"],
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },

    rule: {
      type: String,
      required: [true, "please specify a rule"],
      default: "user",
      enum: {
        values: ["user", "admin"],
        message: "{VALUE} is not a valid rule",
      },
    },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", User);
