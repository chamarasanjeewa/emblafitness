
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserProfileSchema = new Schema({

    firstName: String,
    lastName:String,
    email: String,
    phoneNumber: String,
    createdDate : Date,
    updatedDate:Date,
    user:{type: Schema.Types.ObjectId, ref: 'user'},
    createdOn : Date,
    createdBy:{type: Schema.Types.ObjectId, ref: 'userprofile'},
    updatedOn:Date,
    updatedBy:{type: Schema.Types.ObjectId, ref: 'userprofile'},
    deletedOn:Boolean,
    deletedBy:{type: Schema.Types.ObjectId, ref: 'userprofile'}
});
var UserProfile=mongoose.model('userprofile', UserProfileSchema);
module.exports = UserProfile;

UserProfileSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.createdOn = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.createdDate)
        this.createdOn = currentDate;

    next();
});