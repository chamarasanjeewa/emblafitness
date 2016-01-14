var purchasedGood = require('./models/purchase');
var UserModel = require('./models/user.js');
var UserProfileModel = require('./models/userProfile.js');
var nodemailer = require('nodemailer');
var passwordHash = require('password-hash');
var requestify = require('requestify');
var dateFormat = require('dateformat');
var logincontroller=require('./controllers/account.js');
var mongoose = require('mongoose');

function getPurchased(req,res,options){

    var filter={start:'',end:''};
    var currentDate=new Date();

    options.year=(options.year!=undefined)?options.year:currentDate.getFullYear();
    options.month=(options.month!=undefined)?options.month:currentDate.getMonth();
    var lastDate= new Date(options.year, ( parseInt(options.month)+1), 0);

    filter.start= new Date(options.year,options.month, 1);
    filter.end=lastDate;

    purchasedGood.aggregate([
        {
            $match: {purchasedDate: {$gte: filter.start, $lt: filter.end}}

        }
    ], function (err, result) {
        if (err)
        res.send(err);

         purchasedGood.populate( result, { "path": "userProfileId" }, function(err,results) {
            if (err)  res.send(err);

             var purchased={}
            purchased.options=options;
             for(var i = 0; i<results.length; i++) {
                 console.log('-------'+ req.session.userProfileId)
             console.log(results[i].userProfileId._id)

                 if(results[i].userProfileId._id==req.session.userProfileId){
                     results[i].deletable=true;
                 }else{
                     results[i].deletable=false;
                 }
             }
            purchased.list=results;
            return res.send(purchased);
        });



    });
};
function callBack(){
    console.log('callback')
}

function signInUser(req,res){

}



    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'budgetmanagerapp@gmail.com',
            pass: 'budgetmanager1234'
        }
   
    });
   
var sendMail=function(to,subject,message){
var mailOptions = {
    from: 'Budget manager <budgetmanagerapp@gmail.com>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: message, // plaintext body
    html: '<b>'+message+'</b>' // html body
};

transporter.sendMail(mailOptions, function(error, info){
       if(error){
           return console.log(error);
        console.log('Message sent error---------------------: ' + info.response);

        }
        console.log('Message sent---------------------------: ' + info.response);
   });

}

function registerUser(user,res){
    console.log('username------'+user.username)
    
      console.log('password before hashing'+user.password);

    var hashedPassword = passwordHash.generate( user.password);
    console.log('hashed password'+hashedPassword);

var newUser=new UserModel({
    email: user.email,
    userName:user.username,
    passwordHash: hashedPassword,
    passwordSalt: 'dd'});

newUser.save(function(err) {
    console.log('log user'+newUser._id)
    if (err) {
       res.send(err);
        return;
    } else{
        registerUserProfile(newUser._id);
       // res.json(user);
    }

  console.log('User created!');
});

    function registerUserProfile(userId){
        console.log('inside register userprofile'+userId)
        var newUserProfile=new UserProfileModel({
            email: user.email,
            firstName: user.firstName,// todo hash it
            lastName: user.lastName,
            phoneNumber:user.phoneNumber,
            user:userId,
            createdBy:userId
        });

        newUserProfile.save(function(err) {
            if (err) {
             res.send(err);
             return res;
            }
            var subject="Welcome to B-Man"
var message="<p> B-man is our boading's budget management solution.</p><p>Your continious collaboration is mandatory to manage boading budget successfully!</p><p> Thank you</p>";
            sendMail(newUserProfile.email,subject,message)
            res.json(user);

            console.log('User profile created!');
        });
    }

}

var sendNotificationMessage=function(phoneNumber,message){

	console.log('purchse')
    //94712188862
	requestify.get('http://smsc.vianett.no/V3/CPA/MT/MT.ashx?username=ktvgroup&password=sms7524&tel='+phoneNumber+'&msg='+message+'&msgid=1&SenderAddress=chamara&SenderAddressType=5')
  	.then(function(response) {
      // Get the response body (JSON parsed or jQuery object for XMLs)
     var response= response.getBody();
     console.log(response)
  });
	}


module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all todos

	app.post('/api/login', function(req, res) {
        console.log('serverside login')
        var signInUser=req.body;

        UserModel.findOne({ userName: signInUser.username })
            .exec(function(err, selectedUser) {
                if (err) {

                   res.send(err);
                };
             
                if(selectedUser!=null){

                  //var signedInuserHashedPassword= passwordHash.generate(signInUser.password);
                  var isVerified=passwordHash.verify(signInUser.password, selectedUser.passwordHash); // true
                  
                    if(isVerified){
                        UserProfileModel.findOne({user:selectedUser._id}).exec(function(error, selectedUserProfile) {
                            if (err) {
                                console.log('error retrieving user profile')

                                // throw err
                            };
                            console.log(signInUser.username);
                            req.session.username=signInUser.username;
                            req.session.firstName=selectedUserProfile.firstName;
                            console.log('selected userprofile'+selectedUserProfile)
                            req.session.userProfileId=selectedUserProfile._id;
                            req.session.email=selectedUserProfile.email;
                            console.log(  req.session.userProfileId);
                            console.log( req.session.firstName);
                            return res.json(signInUser);

                        })

                }
                else{

                    var passwordMissMatchError = new Error('user name or password does not match') ;
                    console.log('passwordMissMatchError')
                    //throw passwordMissMatchError
                    res.status(401);
                    return res.json(passwordMissMatchError);
                }
            }
            })

    });

	app.post('/api/register', function(req, res) {

		console.log('USER'+req.body.username)
        registerUser(req.body,res)	;
	});

	app.get('/api/purchased', function(req, res) {
         var options={year:undefined,month:undefined};
        options.year= req.param('year');
        options.month= req.param('month');

        // use mongoose to get all purchased items in the database
		getPurchased(req,res,options);
	});

    app.post('/api/userNameExists', function(req, res) {
        var userName =req.body.userName;
        UserModel.findOne({userName: userName})
            .exec(function (err, selectedUser) {
                if (err) {
                    console.log('error finding username')
                    res.send(err);
                }
                ;
                if (selectedUser == null) {
                    console.log('user exists-------'+true)

                    return res.json(true);
                } else {
                    console.log('user exists-------'+false)

                    return res.json(false);

                }

            });

    });

	// create todo and send back all todos after creation

	app.post('/api/purchased', function(req, res) {

        console.log('-----------categoryId------------'+req.body.categoryId+'-------------')
		 purchasedGood.create({
			text : req.body.text,
			amount: req.body.amount,
			purchasedDate:req.body.date,
            categoryId:req.body.categoryId,
            userProfileId:req.session.userProfileId,
            createdBy:req.session.userProfileId

		}, function(err, purchased) {
			if (err)
				res.send(err);
            var subject="You have done a transaction on behalf of boading!!!"
            var message="<p>Thank you for doing following transaction </p><p>Amount: "+req.body.amount+"</p><p>Description: "+req.body.text+"</p><p>Date: "+dateFormat(req.body.date, "yyyy-mm-dd")+"</p>"
            console.log('------------------------about to send mail to'+req.session.email)

           sendMail( req.session.email,subject,message)
             res.json(purchased);
		});

	});

	// delete a todo
	app.delete('/api/purchased/:purchased_id', function(req, res) {
        console.log('----------delete id of'+req.params.purchased_id)
        var id=mongoose.Types.ObjectId(req.params.purchased_id);
        console.log('----------mongoose id'+id)
        purchasedGood.find({ _id :id }).remove().exec(function(err, result) {
            if (err){
                res.send(err);
                console.log('----------mongoose id'+err)

            }

                res.send(result);


		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};