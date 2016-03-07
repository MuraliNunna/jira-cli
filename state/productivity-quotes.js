var random = require('lodash/random')

var quotes = [
  '"There is a light at the end of the tunnel, but the way out is through." ― David Allen',
  '"You can do anything, but not everything." ― David Allen',
  '"Everything should be made as simple as possible, but not simpler." ― Albert Einstein',
  '"The hurrier I go, the behinder I get." ― Anonymous',
  '"Think like a man of action. Act like a man of thought." ― Henry Bergson',
  '"The beginning is half of every action." ― Greek proverb',
  '"Celebrate any progress. Don’t wait to get perfect." ― Ann McGee Cooper',
  '"Plans get you into things but you’ve got to work your way out." ― Will Rogers',
  '"The middle of every successful project looks like a disaster." ― Rosabeth Moss Cantor',
  '"Talk does not cook rice." ― Chinese proverb'
]

module.exports = function getRandomProductivityQuote () {
  return quotes[random(0, quotes.length - 1)]
}
