const express = require("express");

const dbRouter = require("../data/dbRouter");

const router = express.Router();

// this router handles requests beginning in /api

// handle /api /hubs
router.use("/posts", dbRouter);
// router.use("/accounts", accountsRouter);

module.exports = router;
