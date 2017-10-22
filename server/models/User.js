const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');

const usernameValidation = {
	type: String, 
	lowercase: true,
	unique: true,
	required: [true, "can't be blank"], 
	match: [/^[a-zA-Z0-9]+$/, 'is invalid'], 
	index: true}


const emailValidation = {
	type: String, 
	lowercase: true,
	unique: true,
	required: [true, "can't be blank"], 
	match: [/\S+@\S+\.\S+/, 'is invalid'], 
	index: true
}


const UserSchema = new mongoose.Schema({
  username: usernameValidation,
  email: emailValidation,
  bio: String,
  image: String,
  hash: String,
  salt: String
}, {timestamps: true});


UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

/*
We'll be generating a random salt for each user. 
Then we can use crypto.crypto.pbkdf2Sync() to generate hashes using the salt. 
pbkdf2Sync() takes five parameters: The password to hash, the salt, 
the iteration (number of times to hash the password), the length (how long the hash should be), and the algorithm.
*/
//adjust accordingly

UserSchema.methods.setPassword = function(password){
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

mongoose.model('User', UserSchema);