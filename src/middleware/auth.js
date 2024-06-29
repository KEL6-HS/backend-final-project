const jwt = require("jsonwebtoken");

const ignoreMiddleware = ["/login", "/register"];

module.exports = {
	authenticateToken: (req, res, next) => {
		// Ignore Middleware by specific path
		let fullPath = req.baseUrl + req.path;
		if (fullPath[fullPath.length - 1] == "/") {
			fullPath = fullPath.slice(0, fullPath.length - 1);
		}

		if (ignoreMiddleware.includes(fullPath)) {
			return next();
		}

		const token = req.headers["authorization"];
		if (!token) {
			return res.status(403).json({
				message: "Tidak dapat mengambil sesi akun",
			});
		}

		jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
			if (err) {
				return res.status(403).json({
					message: "Tidak dapat mengambil sesi akun",
					err,
				});
			}

			req.user = user;
			next();
		});
	},
};
