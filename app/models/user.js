// ./models/user.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
   
    userName: String,
    email:String,
    passwordHash: String,
    passwordSalt: String,
    createdOn : Date,
    createdBy:{type: Schema.Types.ObjectId, ref: 'user'},
    updatedOn:Date,
    updatedBy:{type: Schema.Types.ObjectId, ref: 'userprofile'},
    deletedOn:Boolean,
    deletedBy:{type: Schema.Types.ObjectId, ref: 'userprofile'}

});
var User=mongoose.model('user', UserSchema);
module.exports = User;

UserSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.createdOn = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.createdDate)
    this.createdOn = currentDate;

  next();
});