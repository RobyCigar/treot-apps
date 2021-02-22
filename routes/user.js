const express = require("express");
const router = express.Router();
const multer = require("multer");
const jwt = require("jsonwebtoken");

// Import model and config
const Users = require("../models/users.model");
const keys = require("../config/keys");

const { secret, tokenLife } = keys.jwt;

// Configure file upload
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads/profile");
	},
	filename: function (req, file, cb) {
		cb(null, `${Date.now()}.png`);
	},
});

const upload = multer({ storage: storage });

router.get("/", (req, res) => {
	const { role } = req.body;

	if (role == "PARTICIPANT")
		return res.status(300).json({ error: "Unauthorized!" });

	const user = Users.find({}, (err, user) => {
		if (err) {
			console.log(err);
			return res.status(400).json({ error: "Failed to fetch user" });
		}

		res.status(200).json({ success: "Soal has been updated" });
	});
});

router.post("/", (req, res) => {
	const { token } = req.body;
	if (!token)
		return res.status(400).json({ error: "You should send me JWT" });

	jwt.verify(token, secret, function (err, decoded) {
		if (err) return res.status(400).json({ error: "JWT not valid" });
		
		Users.findById(decoded.id, (err, user) => {
			if (err) return res.status(400).json({ error: "JWT decoded but cannot find Id" });
			res.status(200).json({success: user})
		})
	});
});

router.get("/:id", (req, res) => {
	const { id } = req.params;

	if (!id) return res.status(400).json({ error: "Please provide an id" });

	User.findById(id, (err, user) => {
		if (err) {
			console.log(err);
			return res.status(400).json({ error: "Failed to find user id" });
		}

		res.status(200).json({ success: user });
	});
});

router.put("/:id", upload.any(), (req, res) => {
	const { id } = req.params;
	const { name } = req.body;

	Users.findOneAndUpdate(
		{
			_id: id,
		},
		{
			name: req.body.name,
		}
	);
});

module.exports = router;
