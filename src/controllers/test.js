module.exports = {
	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	index(req, res) {
		res.json({
			message: "This is from Controllers!",
		});
	},
};
