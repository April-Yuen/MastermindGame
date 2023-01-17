const express = require("express");
const router = express.Router()
const gameController = require("../controllers/gameController")

router.get("/mainGame", gameController.getMainGame);
router.get("/playNewGame", gameController.getPlayNewGame)
router.post("/postGuessAndHints", gameController.postGuessAndHints);
router.get("/getScore", gameController.getScore)
router.post("/postScore:id", gameController.postScore)
// router.get("/winGame", gameController.winGame)



module.exports = router;