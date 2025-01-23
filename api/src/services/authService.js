const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const auth = {
  register: async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ error: "Missing Field" });
    }

    try {
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return res.json({ error: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await new User({
        name,
        email,
        password: hashedPassword,
      });
      await user.save();

      return res.json({ message: "User registered", user });
    } catch (error) {
      return res.json({ error: "Internal server error" });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Missing Field" });
    }

    try {
      const user = await User.findOne({ email: email });
      if (!user) return res.status(401).json({ message: "User not found" });

      const matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword)
        return res.status(401).json({ message: "Wrong password" });

      // Inkludera userId och email i token-payload
      const payload = { user_id: user.user_id, email: user.email };
      const token = jwt.sign(payload, jwtSecret, { expiresIn: "24h" });

      return res.json({
        message: "User logged in successfully",
        token: token, // Skicka JWT-token
        user: {
          user_id: user.user_id, // Skicka userId
          name: user.name,
          email: user.email,
          role: user.role,
          account_balance: user.account_balance,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error logging in" });
    }
  },

  githubLogin: async (profile, done) => {
    try {
      let user = await User.findOne({ githubId: profile.id });

      if (!user) {
        const email =
          profile.emails && profile.emails.length > 0
            ? profile.emails[0].value
            : "-";
        user = new User({
          name: profile.username,
          email: email,
          githubId: profile.id,
        });
        await user.save();
      }

      const playload = { email: user.email };
      const token = jwt.sign(playload, jwtSecret, { expiresIn: "24h" });

      done(null, { user, token });
    } catch (error) {
      done(error, null);
    }
  },
};

module.exports = auth;
