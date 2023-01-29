const express = require("express");
const router = express.Router()
const gameController = require("../controllers/gameController")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/mainGame", ensureAuth, gameController.getMainGame);
router.get("/randomNumbers", gameController.getRandomNumbers)
router.get("/playNewGame", gameController.getPlayNewGame)
router.post("/postGuessAndHints", gameController.postGuessAndHints);
router.get("/getScore", gameController.getScore)





module.exports = router;