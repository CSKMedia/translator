// function to translate to Robber Language
function translateToRobberLanguage (input) {
  let consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z']
  let translatedText = ''

  for (let i = 0; i < input.length; i++) {
    let currentLetter = input[i]

    if (consonants.includes(currentLetter.toLowerCase())) {
      translatedText += (currentLetter + 'o' + currentLetter)
    } else translatedText += currentLetter
  }
  return translatedText
}

// function to translate to Swedish Language
function translateToSwedishLanguage (input) {
  let consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z']
  let translatedText = ''

  for (let i = 0; i < input.length; i++) {
    let currentLetter = input[i]
    if (consonants.includes(currentLetter)) {
      // regExp från:  https://github.com/denizdogan/robber-language/blob/master/src/index.js
      translatedText = input.replace(/([bcdfghjklmnpqrstvwxz])o\1/gi, '$1', currentLetter)
    }
  }
  return translatedText
}

module.exports = {translateToRobberLanguage, translateToSwedishLanguage}
