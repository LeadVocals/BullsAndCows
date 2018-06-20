//models/Game.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var gameSchema = new Schema({
  user_id: String,
  gen_number: Number,
  total_time: Number,
  tries: Number,
  success: Boolean
});
module.exports = mongoose.model('Game', gameSchema);