import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	email: String,
	password: String,
});

const userModel = mongoose.model("Users", userSchema);

export default userModel;
