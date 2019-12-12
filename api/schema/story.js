let mongoose = require('mongoose')
let validator = require('validator')

let storySchema = new mongoose.Schema({
  storysection: String,
  savestorysection: [String],
})

module.exports = mongoose.model('Story', storySchema)
