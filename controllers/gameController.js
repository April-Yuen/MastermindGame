const axios = require("axios")
const User = require("../models/User")
const Game = require("../models/Game")

let targetNumbersArray 
let gameId
module.exports = {
    getPlayNewGame: async(req, res) => {
        try {
            res.render('playNewGame', {title: "Mastermind-Start Game"})
        } catch (error) {
            console.log(error)
        }
    },

    // get the main game page
    getMainGame: async(req, res) => {
        try {
            let maxNum = 7
            let minNum = 0
            let numberOfDigits = 4
            let randomNumbersAPI = await axios.get(`https://www.random.org/integers/?num=${numberOfDigits}&min=${minNum}&max=${maxNum}&col=1&base=10&format=plain&rnd=new`)
            targetNumbers = randomNumbersAPI.data
            targetNumbersArray = targetNumbers.split("").filter(num => num !== "\n")
            console.log(targetNumbersArray)
            // saving a new game into the database. 
            let game = await Game.create({
                targetNumber: targetNumbersArray,
                user: req.user.id
            })  
            gameId = game._id  
            res.render('mainGame', {targetNumbers: targetNumbers})  
        } catch (error) {
            console.error(error)
        }
    },
    // Save a guess in the database. 
    postGuessAndHints: async(req, res) => {
        let userId = req.user.id
        let guessLimit = 10
        let correctLocation = 0
        let correctNumber = 0
        try {
            const guessNum = req.body.guessNum
            guessNumArray = guessNum.split("")
            console.log(guessNumArray)
            const game = await Game.findById(gameId)
            let arrGuess = game.guess
            arrGuess.push(guessNum)
            await game.save()
            let arrHints = game.hint
            console.log(arrHints)
            let numberGuessRemaining = guessLimit-game.guess.length
            let user = await User.findById(userId)
            let userScore= user.userScore
            console.log(user)
            if(guessNumArray.join("") === targetNumbersArray.join("")){
                arrHints.push("All correct!")
                userScore++
                await user.save()
                console.log(userScore)
                const winGameNote = "All correct! You won!"
                res.render("winGame",{winGameNote: winGameNote})
            }
            for(let i = 0; i < guessNumArray.length; i++){
                if(guessNumArray[i]===targetNumbersArray[i]){
                    correctLocation++
                    correctNumber++
                }else if(guessNumArray.includes(targetNumbersArray[i])){
                    correctNumber++
                }
            }
            if(numberGuessRemaining <= 0){
                const loseGameNote = "Game Over. Do you want to play again?"
                res.render("loseGame", {loseGameNote: loseGameNote})
            }
            arrHints.push(`${correctNumber} correct numbers and ${correctLocation} correct locations`)
            await game.save()
            console.log(game.hint)
            console.log(game.guess)
            res.render("hintsAndGuesses", {guessNums: game.guess, hints: game.hint, numberGuessRemaining: numberGuessRemaining})
        } catch (error) {
            console.log(error)
        }
    },
    postScore: async(req, res) => {
        let userScore
        try {
            const game = await Game.findById(gameId)
            let gameHintArr = game.hint
            console.log(gameHintArr)
            if(gameHintArr.includes("All correct!")){
                userScore = await User.findByIdAndUpdate(
                    {_id: req.user.id},
                    {
                        $inc: {userScore: 1}
                    }
                );
            }
            console.log("Score+1")
        } catch (error) {
            console.log(error)
        }
    },
    getScore: async(req, res) => {
        try {
            const users = await User.find().sort({userScore: -1})
            console.log(users)
            res.render("scoreBoard", {users: users})
        } catch (error) {
         
        }
    }
}   


