const { validateRequestAndExtract } = require("../helper/utils");

module.exports = {
	validateRegistration: (req, res, next) => {
		const form = validateRequestAndExtract(req, {
			email: "required|email",
			password: "required",
			firstName: "required",
			lastName: "nullable",
			streetAddress: "nullable",
			city: "nullable",
			state: "nullable",
			postalCode: "nullable",
			country: "nullable",
		});

		if (!form.validate) {
			return res.status(412).json({ errors: form.errors });
		}

		next();
	},

	validateLogin: (req, res, next) => {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ error: "Email and password are required" });
		}
		next();
	},
};
