var mongoose = require('mongoose');

module.exports = mongoose.model('message', {
	from : {type : String, default: ''},
	to: {type : String, default: ''},
	message: {type : String, default: ''},
	createdDate    : Date,
    updatedDate:Date,
    createdOn : Date,
    createdBy:{type: Schema.Types.ObjectId, ref: 'user'},
    updatedOn:Date,
    updatedBy:{type: Schema.Types.ObjectId, ref: 'user'},
    deletedOn:Boolean,
    deletedBy:{type: Schema.Types.ObjectId, ref: 'user'}
});

