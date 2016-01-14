var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContributionSchema = new Schema({

    userId: Number,
    amount:Number,
    createdDate : Date,
    updatedDate:Date,
    createdOn : Date,
    createdBy:{type: Schema.Types.ObjectId, ref: 'user'},
    updatedOn:Date,
    updatedBy:{type: Schema.Types.ObjectId, ref: 'user'},
    deletedOn:Boolean,
    deletedBy:{type: Schema.Types.ObjectId, ref: 'user'}
});
var ContributionSchema=mongoose.model('contribution', ContributionSchema);
module.exports = ContributionSchema;