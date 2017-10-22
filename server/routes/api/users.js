const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');
const User = mongoose.model('User');
const auth = require('../auth');

/*
* user registers
* POST username, email, password
*/
router.post('/users', function(req, res, next){
	const user = new User();

	user.username = req.body.user.username;
	user.email = req.body.user.email;
	user.setPassword(req.body.user.password);

	user.save().then(function(){
		return res.json({
			user: user.toAuthJSON()
		});
	}).catch(next);
});

module.exports = router;