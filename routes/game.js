const express = require("express");
const router = express.Router()
const gameController = require("../controllers/gameController")

router.get("/mainGame", gameController.getMainGame);
router.get("/randomNumbers", gameController.getRandomNumbers)
router.get("/playNewGame", gameController.getPlayNewGame)
router.post("/postGuessAndHints", gameController.postGuessAndHints);
// router.post("/postWinner", gameController.postWinner)
router.get("/getScore", gameController.getScore)





module.exports = router;