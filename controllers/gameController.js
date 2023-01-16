const axios = require("axios")
const User = require("../models/User")
const Game = require("../models/Game")

// find the current object id being displayed? 
// send that through the main.js as json
// then push the elements into the correct game. 

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
    postGuess: async(req, res) => {
        let guessCount = 0
        let guessLimit = 10
        let correctLocation = 0
        let correctNumber = 0
        try {
            const guessNum = req.body.guessNum
            guessCount++
            guessNumArray = guessNum.split("")
            console.log(guessNumArray)
            console.log(gameId)
            const game = await Game.findById(gameId)
            let arrGuess = game.guess
            arrGuess.push(guessNum)
            await game.save()
            let arrHints = game.hint
            let numberGuessRemaining = guessLimit-guessCount
            if(guessNumArray.join("") === targetNumbersArray.join("")){
                arrHints.push("All correct!")
            }
            for(let i = 0; i < guessNumArray.length; i++){
                if(guessNumArray[i]===targetNumbersArray[i]){
                    correctLocation++
                    correctNumber++
                }else if(guessNumArray.includes(targetNumbersArray[i])){
                    correctNumber++
                }
            }
            arrHints.push(`${correctNumber} correct numbers and ${correctLocation} correct locations`)
            await game.save()
            res.render("mainGame", {numberGuessRemaining: numberGuessRemaining, hints: game.hint, guessNums: game.guess})
        } catch (error) {
            console.log(error)
        }
    },
    // display the hints and guesses
    // I want to take the hints, the for loop, and the conditionals and place them in their own function. 
    getHintsAndGuesses: async(req, res) => {
        try {
            const game = await Game.findById(gameId)
            let arrHints = game.hint
            let guessNumsArray = game.guess[game.guess.length-1].split("")

        } catch (error) {
            
        }
    }
}


