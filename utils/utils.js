module.exports = class Utils {
    static findLocationAndNum(guessNumArray, targetNumbersArray){
          let correctLocation = 0
          let correctNumber = 0
          for(let i = 0; i < guessNumArray.length; i++){
            if(guessNumArray[i]===targetNumbersArray[i]){
                correctNumber++
                correctLocation++
            }else if(guessNumArray.includes(targetNumbersArray[i]) && targetNumbersArray.indexOf(targetNumbersArray[i]) === targetNumbersArray.lastIndexOf(targetNumbersArray[i])){
                correctNumber++
            }
        }
        if (correctLocation === 0 && correctNumber === 0) {
            return "All incorrect!"
        } else {
            return `${correctNumber} correct numbers and ${correctLocation} correct locations`
        }
    }
}  
