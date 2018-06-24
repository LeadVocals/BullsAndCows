//server/routes/routes.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Expense = require('../../models/Expense');
var User = require('../../models/User');
var GameType = require('../../models/GameType');
var Game = require('../../models/Game');
var Tournament = require('../../models/Tournament');

router.get('/', function(req, res){
  res.render('index')
});
//USERS
router.get('/getAllUsers',function(req, res) {
  User.find({}, function(err, users) {
   if (err)
    res.send(err);
   res.json(users);
  });
});
//NEW USER
router.route('/register_user')
.post(function(req,res) {
	User.find({$and: [{username: req.body.username}]}, function(err, users) {
   if (err)
    res.send(err);
   if(!users.length){
   	var user = new User();
  user.name = req.body.name;
  user.username = req.body.username;
  user.password = req.body.password;
  user.role = req.body.role;
	user.save(function(err) {
      if (err)
        res.send(err);
      res.send('User registered successfully!');
  });
   }else{   	
   	res.send('USER WITH THIS EMAIL ALREADY EXISTS!');
   }
   
  });
})
//UPDATE USER
router.route('/update_user')
.post(function(req, res) {
 const doc = {
     name: req.body.name,
     username: req.body.username,
     password: req.body.password,
     role: req.body.role
 };
 console.log(doc);
  User.update({_id: req.body._id}, doc, function(err, result) {
      if (err)
        res.send(err);
      res.send('User successfully updated!');
  });
});
//DELETE USER
router.get('/delete_user', function(req, res){
 var id = req.query.id;
 User.find({_id: id}).remove().exec(function(err, user) {
  if(err)
   res.send(err)
  res.send('User successfully deleted!');
 })
});
//GAMES
router.get('/getAllActiveGames',function(req, res) {
  GameType.find({$and: [{status: 1}]}, function(err, game_types) {
   if (err)
    res.send(err);
   res.json(game_types);
  });
});
router.get('/game_type', function(req, res){
 GameType.find({$and: [{id: req.query.id}]}, function(err, game_type) {
   if (err)
    res.send(err);
   res.json(game_type);
  });
});
//GENERATE NUMBER
router.route('/generate_number')
.post(function(req,res) { 
	function randomDigit(diggits){
	  var generated_number = shuffle( "0123456789".split('') ).join('').substring(0,diggits);
	  while(String(generated_number)[0]=='0'){
	  	generated_number = shuffle( "0123456789".split('') ).join('').substring(0,diggits);
	  }
	  return generated_number;
	}

	function shuffle(o){
	    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	    return o;
	}
	var game = new Game();
	if(typeof(req.body.username)!='undefined' && req.body.username!=null && req.body.username!=0){		
		  game.username = req.body.username;
	}else{
		game.username = '';
	}
	if(typeof(req.body.tour_id)!='undefined' && req.body.tour_id!=null && req.body.tour_id!=0){		
		  game.tour_id = req.body.tour_id;
	}else{
		game.tour_id = '';
	}
		  game.gen_number = randomDigit(req.body.diggits);
		  game.total_time = 0;
		  game.tries = 0;
		  game.success = 0;
			game.save(function(err) {
		      if (err)
		        res.send(err);
		      res.send({game_id:game._id});
		  });	
})

router.route('/check_number')
.post(function(req,res) { 
	Game.find({$and: [{_id: req.body.game_id}]}, function(err, game) {
   if (err)
    res.send(err);
    
    let cows =0;
    let bulls =0;
    let success =0;
    let tries =game[0].tries+1;
    let total_time = req.body.esplaced_time;
    
    if(game[0].gen_number==req.body.number){
    	success=1;
    	bulls=4;
    }else{
    	var gen_number = String(game[0].gen_number);
    	var checked_number = String(req.body.number);
		for (var i = 0; i < gen_number.length; i++) {
			if (checked_number[i] == gen_number[i]) {
				bulls++;
			} else if (gen_number.indexOf(checked_number[i])>-1) {
				cows++;
			}
		}
    }
    
    const doc = {
	     success: success,
	     tries: tries,
	     total_time: total_time
	 };
	  Game.update({_id: req.body.game_id}, doc, function(err, result) {
	      if (err)
	        res.send(err);
		      let current_try = {
		    	'success': success,
		    	'bulls': bulls,
		    	'cows': cows,    
		    	'tries':tries,
		    	'total_time':total_time
		    }
		   	res.json(current_try);
	  });   
   
  });	
})
//LOGIN
router.route('/user_login')
.post(function(req,res) { 
  User.find({$and: [{username: req.body.username}, {password: req.body.password}]}, function(err, users) {
   if (err)
    res.send(err);
   if(!users.length){
   	res.send('USER NOT EXISTS!');
   }else{   	
   	res.json(users);
   }
   
  });
})
// GAME TYPES
router.get('/getAllGameTypes',function(req, res) {
  GameType.find({}, function(err, game_types) {
   if (err)
    res.send(err);
   res.json(game_types);
  });
});
//NEW GAME TYPE
router.route('/insert_game_type')
.post(function(req,res) {
	GameType.find({$and: [{diggits: req.body.diggits}]}, function(err, game_types) {
   if (err)
    res.send(err);
   if(!game_types.length){
   	var game_type = new GameType();
  game_type.name = req.body.name;
  game_type.diggits = req.body.diggits;
  game_type.total_time = req.body.total_time;
  game_type.status = req.body.status;
	game_type.save(function(err) {
      if (err)
        res.send(err);
      res.send('Game type added successfuly!');
  });
   }else{   	
   	res.send('GAME TYPE WITH THIS NUMBER OF DIGGITS ALREADY EXISTS!');
   }
   
  });
})
//UPDATE GAME TYPE
router.route('/update_game_type')
.post(function(req, res) {
 const doc = {
     name: req.body.name,
     diggits: req.body.diggits,
     total_time: req.body.total_time,
     status: req.body.status
 };
 console.log(doc);
  GameType.update({_id: req.body._id}, doc, function(err, result) {
      if (err)
        res.send(err);
      res.send('Game type successfully updated!');
  });
});
//DELETE GAME TYPE
router.get('/delete_game_type', function(req, res){
 var id = req.query.id;
 GameType.find({_id: id}).remove().exec(function(err, game_type) {
  if(err)
   res.send(err)
  res.send('Game type successfully deleted!');
 })
});

router.route('/getGameTypeByName')
.post(function(req,res) { 
  GameType.find({$and: [{name: req.body.name}]}, function(err, game_types) {
   if (err)
    res.send(err);
   if(!game_types.length){
   	res.send('GAME TYPE NOT EXISTS!');
   }else{   	
   	res.json(game_types);
   }
   
  });
})

// TOURNAMENTS
router.get('/getAllTournaments',function(req, res) {
  Tournament.find({}, function(err, tournaments) {
   if (err)
    res.send(err);
   res.json(tournaments);
  });
});
router.get('/getAllActiveTournaments',function(req, res) {
	var today = new Date();
  Tournament.find({$and: [{start_date: {$lte : today }},{end_date: {$gte : today }}]}, function(err, tournaments) {
   if (err)
    res.send(err);
   res.json(tournaments);
  });
});
//NEW TOURNAMENT
router.route('/insert_tournament')
.post(function(req,res) {
	Tournament.find({$and: [{game_type: req.body.game_type}]}, function(err, tournaments) {
   if (err)
    res.send(err);
   if(!tournaments.length){
   	var tournament = new Tournament();
  tournament.name = req.body.name;
  tournament.game_type = req.body.game_type;
  tournament.start_date = req.body.start_date;
  tournament.end_date = req.body.end_date;
	tournament.save(function(err) {
      if (err)
        res.send(err);
      res.send('Tournament added successfuly!');
  });
   }else{   	
   	res.send('TOURNAMENT WITH THIS GAME TYPE ALREADY EXISTS AND IS ACTIVE!');
   }
   
  });
})
//UPDATE TOURNAMENT
router.route('/update_tournament')
.post(function(req, res) {
 const doc = {
     name: req.body.name,
     game_type: req.body.game_type,
     start_date: req.body.start_date,
     end_date: req.body.end_date
 };
 console.log(doc);
  Tournament.update({_id: req.body._id}, doc, function(err, result) {
      if (err)
        res.send(err);
      res.send('Tournament successfully updated!');
  });
});
//DELETE TOURNAMENT
router.get('/delete_tournament', function(req, res){
 var id = req.query.id;
 Tournament.find({_id: id}).remove().exec(function(err, tournament) {
  if(err)
   res.send(err)
  res.send('Tournament successfully deleted!');
 })
});
//HIGHSCORE
router.get('/getHighscore',function(req, res) {
	Game.find({$and: [{success: '1'}]}).sort({tries: 1,total_time: 1}).limit(10).exec(function(err, data){
	      if (err)
	    res.send(err);
	   res.json(data);
	  });
});
//TOURNAMENT SCORES
router.get('/getTournamentScores',function(req, res) {
	var id = req.query.tour_id;
	Game.find({$and: [{success: '1'},{tour_id: id}]}).sort({tries: 1,total_time: 1}).limit(10).exec(function(err, data){
	      if (err)
	    res.send(err);
	   res.json(data);
	  });
});
module.exports = router;

