var express = require('express');
var router = express.Router();

/* GET home page. */
var user = new Array(
	{
	username : 'jjn00189',
	password : '123456'
	},
	{
	username : '40301',
	password : '123456'
	}
);


router.get('/', function(req, res, next) {
	res.render('login', { title: 'Express' });
});

function check(obj){
	for(var i=0;i<user.length;i++){
		if(user[i].username==obj.username&&user[i].password==obj.password)
			return true;
	}
	return false;
};

router.post('/', function(req, res, next) {
  	if(check(req.body)){
		//res.cookie("name",user.username,{maxAge:600000});
		res.render('chat', { name: req.body.username });
  	}
  	else {
  		res.render('login', { title: 'Express' });
  	}
});

module.exports = router;
