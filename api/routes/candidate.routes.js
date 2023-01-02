const express = require("express");

const router = express.Router();

const candidates = require("../models/candidates");

const {
  upload,
  uploadToCloudinary,
} = require("../middlewares/file.middleware");

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

router.post(
  "/",
  [upload.single("cv"), uploadToCloudinary],
  async (req, res, next) => {
    try {
      req.body.cv = req.file_url;
      const newCandidate = new candidates(req.body);

      const createdCandidate = await newCandidate.save();
      return res.status(201).json(createdCandidate);
    } catch (error) {
      next(error);
    }
  }
);

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
