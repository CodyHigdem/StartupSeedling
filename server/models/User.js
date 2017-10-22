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

mongoose.model('User', UserSchema);