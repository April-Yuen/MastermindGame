module.exports = class Utils {
        static findLocationAndNum(guessNumArray, targetNumbersArray) {
            let correctLocation = 0
            let correctNumber = 0
            let slicedTarget = [...targetNumbersArray]
          
            for (let i = 0; i < guessNumArray.length; i++) {
              const guessedNum = guessNumArray[i];
          
              if (guessedNum === targetNumbersArray[i]) {
                correctNumber++
                correctLocation++
                guessNumArray.splice(i,1, 'blank');
                slicedTarget.splice(i,1, 'blank');
                }
              else if (slicedTarget.includes(guessedNum)) {
                  correctNumber++
                const idxOfTarget = slicedTarget.indexOf(guessedNum);
                slicedTarget.splice(idxOfTarget, 1, 'blank');
                guessNumArray.splice(i, 1, 'blank');      
              }
            }
          
              return printResult(correctLocation, correctNumber);
          
          }
}  

function printResult(correctLocation, correctNumber) {

    if (correctLocation === 0 && correctNumber === 0) {
      return "All incorrect!"
    }else if(correctLocation === 1 && correctNumber > 1){
      return `${correctNumber} correct numbers and ${correctLocation} correct locations`
    }else if(correctLocation > 1 && correctNumber === 1){
      return `${correctNumber} correct numbers and ${correctLocation} correct location`
    }else if(correctLocation <= 1 && correctNumber <= 1){
      return `${correctNumber} correct number and ${correctLocation} correct location`
    }else {
      return `${correctNumber} correct numbers and ${correctLocation} correct locations`
    }
}

