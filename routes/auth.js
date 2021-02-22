const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("crypto");
const bcrypt = require("bcryptjs");

// Import models & config
const Users = require("../models/users.model");
const keys = require("../config/keys");

const { secret, tokenLife } = keys.jwt;

// LOGIN

router.route("/login").post((req, res) => {
	const { email, password } = req.body;

	if (!email)
		return res
			.status(400)
			.json({ error: "You must enter an email address" });
	if (!password)
		return res.status(400).json({ error: "You must enter an password" });

	Users.findOne({ email }).then((user) => {
		if (!user) {
			return res
				.status(400)
				.send({ error: "No user found for this email address" });
		}

		bcrypt.compare(password, user.password).then((isMatch) => {
			if (isMatch) {
				const payload = {
					id: user._id,
				};

				jwt.sign(
					payload,
					secret,
					{ expiresIn: tokenLife },
					(err, token) => {
						if (err) {
							return res.status(400).json({
								error: "Json webtoken failed to execute",
							});
						}

						res.status(200).json({
							success: true,
							token: `Bearer ${token}`,
							user: {
								id: user._id,
							},
						});
					}
				);
			} else {
				res.status(400).json({ error: "Password does not match" });
			}
		});
	});
});

// REGISTER
router.route("/register").post((req, res) => {
	const { name, email, password, role } = req.body;

	if (!name)
		return res.status(400).json({ error: "You must fill the name" });
	if (!email)
		return res.status(400).json({ error: "You must fill the email" });
	if (!password)
		return res.status(400).json({ error: "You must fill the password" });

	// Check if user is already exist
	Users.findOne({ email }).then((user) => {
		if(user) 
			return res.status(400).json({error: "this email is already exist"})
	})

	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(password, salt, (err, hash) => {
			if (err) {
				console.log("bcrypt failed");
				return res.status(400).json({
					error:
						"Your request could not be processed Please try again.",
				});
			}

			const encryptedPass = hash;

			const newUser = new Users({
				name: name,
				email: email,
				password: encryptedPass,
				role: role,
				created: Date.now(),
			});

			newUser.save(async (err, user) => {
				if (err) {
					console.log(err);
					return res.status(400).json({
						error:
							"Your request could not be processed. Please try again",
					});
				}

				const payload = {
					id: user._id,
					role: user.role,
				};

				jwt.sign(
					payload,
					secret,
					{ expiresIn: tokenLife },
					(err, token) => {
						if (err) {
							console.log(err);
						}
						res.status(200).json({
							succes: true,
							token: `Bearer ${token}`,
							user: {
								id: user._id,
								name: user.name,
								email: user.email,
								role: user.role,
							},
						});
					}
				);
			});
		});
	});
});

//This is a protected route
router.get("/user/data", (req, res) => {
	console.log("ini req body");
	console.log(req.body);
	//verify the JWT token generated for the user
	jwt.verify(req.body.token, secret, (err, authorizedData) => {
		if (err) {
			//If error send Forbidden (403)
			console.log(err);
			res.sendStatus(403);
		} else {
			//If token is successfully verified, we can send the autorized data
			console.log(authorizedData);
			res.json({
				message: "Successful log in",
				authorizedData,
			});
			console.log("SUCCESS: Connected to protected route");
		}
	});
});

module.exports = router;
