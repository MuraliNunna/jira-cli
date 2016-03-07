var random = require('lodash/random')

var quotes = [
  '"Your mind is for having ideas, not holding them." ― David Allen',
  '"There is a light at the end of the tunnel, but the way out is through." ― David Allen',
  '"Simplicity boils down to two steps: Identify the essential. Eliminate the rest." ― Leo Babauta'
]

module.exports = function getRandomProductivityQuote () {
  return quotes[random(0, quotes.length - 1)]
}
