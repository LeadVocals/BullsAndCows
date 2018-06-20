//models/GameType.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var gameTypeSchema = new Schema({
  name: String,
  diggits: Number,
  total_time: Number,
  status: Number
});
module.exports = mongoose.model('GameType', gameTypeSchema);