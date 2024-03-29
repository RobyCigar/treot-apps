const express = require("express");
const jwt = require("jsonwebtoken");
const Soal = require("../models/soal.model");

const keys = require("../config/keys");
const router = express.Router();

const { secret } = keys.jwt

router.get("/", (req, res) => {
	Soal.find({}, (err, soal) => {
		if(err) {
			console.log(err)
			return res.status(400).json({error: "Cannot get all soal"})
		} else {
			return res.status(200).json({
				soal: soal
			})
		}
	})
})

router.post("/", (req, res) => {
	const { nama, soal, createdBy, time } = req.body;

	if (!createdBy) return res.status(400).json({error:'You should add the creator of soal'})
	if (!soal)
		return res
			.status(400)
			.json({ error: "Soal missing, add the correct soal" });

	const newSoal = new Soal({
		nama: nama,
		soal: soal.soal,
		time: time,
		createdBy: createdBy,
		created: Date.now(),
	});


	newSoal.save(async (err, soal) => {
		if (err) {
			console.log(err)
			return res
				.status(400)
				.json({ error: "Failed to send soal to the database" });
		}
		res.status(200).json({ success: "Soal successfully added" });
	});
});

router.get("/:id", (req, res) => {
	const { id } = req.params;
	if (!id)
		return res
			.status(400)
			.json({ error: "Failed to fetch because there is no id" });

	console.log(id);

	Soal.findById(id, (err, soal) => {
		if (err) return res.status(400).json({ error: "Cannot find soal" });
		res.status(200).json({
			soal: soal,
		});
	});
});

router.put("/:id", (req, res) => {
	const id = req.params.id;
	const { soal } = req.body;

	if (!id) res.status(400).json({ error: "soal id not found" });

	Soal.findByIdAndUpdate(
		id,
		{
			soal: soal,
		},
		(err, updatedSoal) => {
			if (err) {
				console.log(err)
				res.status(400).json({error: err})
			}

			res.status(200).json({
				success: "Soal successfully updated",
			});
		}
	);
});

router.delete("/:id", (req, res) => {
	const id = req.params.id;

	if (!id) return res.status(400).json({ error: "Soal failed to delete, id is not given" });

	Soal.findByIdAndDelete(id, (err, deletedSoal) => {
		if(err) {
			console.log(err)
			res.status(400).json({error: "Soal failed to delete"})
		}

		res.status(400).json({success: "Soal has been deleted"})
	})

});

module.exports = router;
