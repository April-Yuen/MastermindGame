const axios = require("axios")
const User = require("../models/User")
const Game = require("../models/Game")
const Utils = require("../utils/utils")

module.exports = {
    getPlayNewGame: async(req, res) => {
        let userId = req.user.Id
        try {
            User.findOne({user: userId})
            res.render('playNewGame', {title: "Mastermind-Start Game", userName: req.user.userName})
        } catch (error) {
            console.log(error)
        }
    },
    // get the main game page
    getMainGame: async(req, res) => {
        let userId = req.user.id
        let guessLimit = 10
        const infoErrorsObj = req.flash('infoErrors')
        try {
            // find the current game being played.
            const game = await Game.findOne({user: userId}).sort({ _id: -1 })
            let gameHints = game.hint
            let gameGuesses = game.guess
            let targetNumber = game.targetNumber.join("")
            // check to see how many guesses are remaining. 
            let numberGuessRemaining = guessLimit-game.guess.length
            if(numberGuessRemaining <= 0){
                const loseGameNote = `Game Over. The number is ${targetNumber}. Do you want to play again?`
                res.render("loseGame", {loseGameNote: loseGameNote})
            }
            res.render('mainGame', {gameHints: gameHints, gameGuesses: gameGuesses, numberGuessRemaining: numberGuessRemaining, infoErrorsObj, targetNumber: targetNumber} )  
        } catch (error) {
            console.error(error)
        }
    },
    // fetch random number from the randomAPI
    getRandomNumbers: async (req, res) => {
        try{
            let maxNum = 7
            let minNum = 0
            let numberOfDigits = 4
            // Fetching random numbers from the API
            let randomNumbersAPI = await axios.get(`https://www.random.org/integers/?num=${numberOfDigits}&min=${minNum}&max=${maxNum}&col=1&base=10&format=plain&rnd=new`)
            targetNumbers = randomNumbersAPI.data
            targetNumbersArray = targetNumbers.split("").filter(num => num !== "\n")
            let game = await Game.create({
                targetNumber: targetNumbersArray,
                user: req.user.id
            })  
            game = game.id
            res.redirect('mainGame')  
        } catch (error) {
            console.error(error)
        }
    },
    // Save a guess in the database. 
    postGuessAndHints: async(req, res) => {
        let userId = req.user.id
        try {
            // post the Number Guessed to the database. Find the game, turn the guess number into an array so that I can find the location. 
            const game = await Game.findOne({user: userId}).sort({ createdAt: -1 })
            const guessNum = req.body.guessNum
            // Conditional to flash error messages and prevent user from inputting wrong keys. 
            if(isNaN(guessNum) || guessNum.length > 4 || guessNum.length < 4){
                req.flash("infoErrors", "Please enter only 4 digits.")
                return res.redirect("mainGame")
            }else{
                const guessNumArray = guessNum.split("")
                let arrGuess = game.guess
                arrGuess.push(guessNum)
                await game.save()
                // Post the hints to the database. 
                let arrHints = game.hint
                // Find the user score. 
                let user = await User.findById(userId)
                let userScore= user.userScore
                // conditional statement to find if user won.
                const targetNumbersArray = game.targetNumber
                if(guessNumArray.join("") === targetNumbersArray.join("")){
                    arrHints.push("All correct!")
                    userScore = await User.findByIdAndUpdate(
                        {_id: req.user.id},
                        {
                            $inc: {userScore: 1}
                        }
                    );
                    await user.save()
                    const winGameNote = "All correct! You won!"
                    return res.render("winGame",{winGameNote: winGameNote, layout: './layouts/win'})
                }else{
                    //calculate the number of correct locations and the number of correct Numbers using util helper functions
                    const hint = Utils.findLocationAndNum(guessNumArray, targetNumbersArray)
                    arrHints.push(hint)
                    await game.save()
                    return res.redirect("mainGame")
                }
            }
        } catch (error) {
            console.log(error)
        }
    },
    getScore: async(req, res) => {
        try {
            const users = await User.find().sort({userScore: -1})
            res.render("scoreBoard", {users: users})
        } catch (error) {
            console.log(error)
        }
    }
}   


