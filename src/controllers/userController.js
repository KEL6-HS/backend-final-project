const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register(req, res) {
	const {
		email,
		password,
		firstName,
		lastName,
		streetAddress,
		city,
		state,
		postalCode,
		country,
	} = req.body;
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = await User.create({
			email,
			password: hashedPassword,
			first_name: firstName,
			last_name: lastName,
			street_address: streetAddress,
			city,
			state,
			postal_code: postalCode,
			country,
		});
		res.status(201).json({ message: "User registered successfully!" });
	} catch (error) {
		res.status(400).json({ error: "Error registering user: " + error.message });
	}
}

async function login(req, res) {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ where: { email } });
		if (!user) {
			return res.status(401).json({ error: "Invalid email or password" });
		}

		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			return res.status(401).json({ error: "Invalid email or password" });
		}

		const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
			expiresIn: "7d",
		});
		res.status(200).json({ message: "Login successful!", token, user });
	} catch (error) {
		res.status(400).json({ error: "Error logging in: " + error.message });
	}
}

module.exports = {
	register,
	login,
};
