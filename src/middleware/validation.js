module.exports = {
    validateRegistration: (req, res, next) => {
      const { email, password, firstName, lastName, streetAddress, city, state, postalCode, country } = req.body;
      if (!email || !password || !firstName || !lastName || !streetAddress || !city || !state || !postalCode || !country) {
        return res.status(400).json({ error: "All fields are required" });
      }
      next();
    },
  
    validateLogin: (req, res, next) => {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }
      next();
    }
  };
  