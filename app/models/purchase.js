var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PurchasedGoodSchema=new Schema({
    text : {type : String, default: ''},
    amount: Number,// 	userId:{type : String, default: ''},
    modifiedDate :Date,
    userProfileId:{type: Schema.Types.ObjectId, ref: 'userprofile'},
    purchasedDate:Date,
    createdOn : Date,
    createdBy:{type: Schema.Types.ObjectId, ref: 'userprofile'},
    updatedOn:Date,
    updatedBy:{type: Schema.Types.ObjectId, ref: 'userprofile'},
    deletedOn:Boolean,
    deletedBy:{type: Schema.Types.ObjectId, ref: 'userprofile'},
    categoryId:Number

})

var PurchasedGood=mongoose.model('purchasedgood', PurchasedGoodSchema);
module.exports = PurchasedGood;

PurchasedGoodSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.createdOn = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.createdDate)
        this.createdOn = currentDate;

    next();
});
