import jwt from "jsonwebtoken";
import argon2 from "argon2";
import sgMail from "@sendgrid/mail";

// function to help us send mail
export const mail = async (msg) => {
	try {
		await sgMail.send(msg);
	} catch (error) {
		console.error(error);
	}
};

// function for generating Jwt token
export const generateJWT = (payload) => {
	const secret = process.env.TOKEN_SECRET;
	const token = jwt.sign(payload, secret, {
		expiresIn: "2 days",
	});
	return token;
};

// function for generating hash
export const hashPassword = async (password) => {
	try {
		const hashedPassword = await argon2.hash(password);
		return hashedPassword;
	} catch (error) {
		console.log("Error occured while hashing the password", error);
	}
};

// function for checking if the password typed and the hashed one that is stored in our database matches or not
export const verifyPassword = async (password, hashedPassword) => {
	try {
		const match = await argon2.verify(hashedPassword, password);
		return match;
	} catch (error) {
		console.log("Error occured while verifying the authenticity of password", error);
	}
};

// middleware code to append user details(from jwt) to the req.decoded
export const authenticateMiddleware = async (req, res, next) => {
	let token = req.headers["x-access-token"]; // we're passing a jwt token back from the client by appending it to the headers.
	if (token) {
		try {
			jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
				if (err) {
					return res.status(401).json({
						error: err,
						success: false,
						message: "Failed to authenticate token",
					});
				} else {
					req.decoded = decoded;
					next();
				}
			});
		} catch (error) {
			res.status(403).send({
				error: "Unauthorized",
			});
		}
	} else {
		return res.status(403).send({
			success: false,
			message: "no token provided",
		});
	}
};
