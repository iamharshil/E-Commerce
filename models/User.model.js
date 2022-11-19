const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
      unique: [true, "Number is already being used."],
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Email already exists"],
      validate: [validator.isEmail, "Enter a valid email address."],
    },
    password: {
      type: String,
      required: true,
      minLength: [4, "Password should be at least eight characters"],
    },
  },
  { timestamps: true }
);

UserSchema.path("email").validate(async (email) => {
  try {
    const emailCount = await mongoose.models.User.countDocuments({ email });
    return !emailCount;
  } catch (err) {
    res.json({ err });
  }
}, "Email already exists");

UserSchema.path("number").validate(async (number) => {
  try {
    const numberCheck = await mongoose.models.User.countDocuments({ number });
    return !numberCheck;
  } catch (err) {
    res.json({ err });
  }
}, "Number is already being used");

// encrypt password
//schema middleware to apply before saving
// userSchema.pre("save", async function (next) {
//   this.password = await bcrypt.hash(this.password, 12);
//   this.passwordConfirm = undefined;
//   next();
// });

module.exports = mongoose.model("User", UserSchema);
