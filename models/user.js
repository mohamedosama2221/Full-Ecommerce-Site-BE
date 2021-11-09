const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

User.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

User.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name, email: this.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

module.exports = mongoose.model("User", User);
