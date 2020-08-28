import User from "../database/models/user.js";
import { verifyPassword, generateJWT, hashPassword } from "../services/utility.js";

export const register = async (req, res) => {
	const { email, password } = req.body;
	try {
		const response = await User.findOne({ email });
		if (response) return res.status(403).json({ error: "User already exist with same Email Id" });
		const hashedPassword = await hashPassword(password); // here we compare the typed password with the hashed password stored in our database
		const user = {
			email,
			password: hashedPassword,
		};
		const newResponse = await User.create(user);
		if (!newResponse) return res.status(400).json({ error: "Error occured while registering the user" });
		return res.status(201).json({
			message: "Successfully registered " + name,
		});
	} catch (error) {
		return res.status(400).json({ error: "error occurred while registering the user" });
	}
};

export const login = async (req, res) => {
	const potentialUser = {
		email: req.body.email,
	};
	try {
		const response = await User.findOne(potentialUser);
		if (!response) return res.status(401).json({ error: "User doesn't exist!" });
		const match = await verifyPassword(response.password, req.body.password); // here we compare the typed password with the hashed password stored in our database
		if (!match) return res.status(403).json({ error: "Invalid Password!" });
		const payload = {
			email: req.body.email,
		};
		let token = generateJWT(payload);
		return res.status(200).json({
			message: "user found token sent",
			token: token,
		});
	} catch (error) {
		return res.status(400).json({ error: "error occurred while fetching from database" });
	}
};
