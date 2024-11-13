import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please provide an email!"],
    unique: [true, "Email already exists!"],
  },

  username: {
    type: String,
    required: [true, "Please provide a name!"],
  },

  image: {
    type: String,
  },
});

const User = models.User || model("User", UserSchema);

UserSchema.pre("save", function (next) {
  // Perform some action before saving the document

  console.log("A user is about to be saved:", this);
  next();
});

export default User;
