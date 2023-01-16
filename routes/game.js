const express = require("express");
const router = express.Router()
const gameController = require("../controllers/gameController")

router.get("/mainGame", gameController.getMainGame);
router.get("/playNewGame", gameController.getPlayNewGame)
router.post("/postGuess", gameController.postGuess);
router.get("/getHintsAndGuesses", gameController.getHintsAndGuesses)



module.exports = router;