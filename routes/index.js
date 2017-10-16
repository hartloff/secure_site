var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

router.get('/', function (req, res, next) {
	res.render("index");
});


router.post('/register', function (req, res, next) {
	var username = req.body.username;
	var password = req.body.password;
	var salt = bcrypt.genSaltSync();
	var hash = bcrypt.hashSync(password, salt);
	req.db.get('users').insert({
		'username': username,
		'password': hash
	}, function(err, data){
		if(err){
			res.render("index", {'message': "db error"});
		}else{
			res.render("index", {'message': "registered!"});
		}
	})
});


router.post('/login', function (req, res, next) {
	var username = req.body.username;
	var password = req.body.password;
	req.db.get('users').findOne({
		'username': username
	}, function(err, data){
		if(err){
			res.render("index", {'message': "db error"});
		}else if(!data) {
			res.render("index", {'message': "username not found"});
		}else{
			if(bcrypt.compareSync(password, data.password)){
				res.render("index", {'message': "Welcome " + username});
			}else{
				res.render("index", {'message': "wrong password"});
			}
		}
	})
});




module.exports = router;





