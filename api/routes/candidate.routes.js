const express = require("express");

const router = express.Router();

const candidates = require("../models/candidates");

router.get("/", async (req, res) => {
  try {
    const candidatesList = await candidates.find(
      {},
      { createdAt: 0, updatedAt: 0, __v: 0 }
    );
    return res.status(200).json(candidatesList);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newCandidate = new candidates({
      id: req.body.id,
      name: req.body.name,
      surname: req.body.surname,
      phone: req.body.phone,
      email: req.body.email,
      cv: req.body.cv,
    });

    const createdCandidate = await newCandidate.save();
    return res.status(201).json(createdCandidate);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    // No será necesaria asignar el resultado a una variable ya que vamos a eliminarlo
    await candidates.findByIdAndDelete(id);
    return res.status(200).json("Skate deleted!");
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
