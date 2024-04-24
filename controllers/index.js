const express = require('express');
const router = express.Router();

const userRoutes = require("./userController");
router.use("/api/users",userRoutes)

const tankRoutes = require("./tankController");
router.use("/api/tanks",tankRoutes)

const fishRoutes = require("./fishController");
router.use("/api/fishes",fishRoutes)

module.exports = router;