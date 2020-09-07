var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const User = require('../model')("User");
const Course = require('../model')("Course");
const connectEnsureLogin = require("connect-ensure-login");
const passport = require('passport')
	, LocalStrategy = require('passport-local').Strategy;
const debug = require("debug")("lab4:model-user");

var nodemailer = require('nodemailer');
var cors = require('cors');
const creds = require('../config');

var transport = {
	host: 'smtp.gmail.com', // Don’t forget to replace with the SMTP host of your provider
	port: 587,
	auth: {
		user: creds.USER,
		pass: creds.PASS
	}
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
	console.log("in verify");
	if (error) {
		console.log(error);
	} else {
		console.log('Server is ready to take messages');
	}
});


router.use(passport.initialize());


passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password1'
},
	function (username, password, done) {
		User.findOne({ email: username, password1: password }, function (err, user) {
			debug("User after findOne " + user);
			if (err) {
				debug("There is error in localStrategy. user is " + user + " error is " + err);
				return done(err);
			}
			if (!user) {
				debug("User is null in localStrategy. user is " + user);
				return done(null, false, { message: 'Incorrect username or password.' });
			}
			/*if (!user.validPassword(password)) {
				debug("User password is incorrect in localStrategy. user is " + user);
				return done(null, false, { message: 'Incorrect password.' });
			}*/
			debug("User is OK in localStrategy. user is " + user);
			return done(null, user);
		});
	}
));

router.post('/AddSavedItem', async (req, res) => {
	try {
		console.log("The user name in AddSavedItem:" + req.body.userName);
		console.log("The course id in AddSavedItem:" + req.body.courseId);
		let user = await User.findOne({ email: req.body.userName });
		user.savedCourses.push(req.body.courseId);
		await User.DELETE(user._id);
		let user2 = [];
		//	console.log("In updateUser :" +req.body.name);
		user2.push(user.email);
		user2.push(user.name);
		user2.push(user.password1);
		user2.push(user.type);
		user2.push(user.cart);
		user2.push(user.savedCourses);
		user2.push(user.orders);
		//console.log("In updateUser user is:" + req.body);
		await User.CREATE(user2);
		res.end("ok");
	} catch (err) {
		console.log("the error in Add saves item: " + err);
		res.end("error");
	}
})

router.post('/sendEmail', (req, res, next) => {
	var name = req.body.name
	var email = req.body.email
	var message = req.body.message
	var content = `name: ${name} \n email: ${email} \n message: ${message} `
	console.log(content);
	var mail = {
		from: name,
		to: email,  // Change to email address that you want to receive messages on
		subject: 'New Message from Contact Form',
		text: content
	}

	transporter.sendMail(mail, (err, data) => {
		if (err) {
			res.json({
				status: 'fail'
			})
		} else {
			res.json({
				status: 'success'
			})
		}
	})
});
router.post('/getUserName', async function (req, res) {
	try {
		let user = await User.findOne({ email: req.body.email });


		res.send(JSON.stringify({ name: user.name }));
	}
	catch (err) {
		res.end(JSON.stringify('Error'));
	}
});

router.post('/getSavedItems', async function (req, res) {
	try {
		console.log("req.body.userName get Saved Items " + req.userName);
		let user = await User.REQUEST({ email: req.body.userName });
		console.log("user in server get Saved Items " + user);
		console.log("user saved items in server " + user.savedCourses);
		let productCart = [];
		for (let i = 0; i < req.user.savedCourses.length; i++) {
			let course = await Course.findOne({ _id: req.user.savedCourses[i].courseId });
			productCart.push({
				id: course._id,
				name: course.name,
				price: course.price,
				photo: course.src,
				rating: Math.floor(Math.random() * 6),
				moreDetails: course.description,
				saved: true,
			});
			res.end(JSON.stringify(productCart));

		}
	}
	catch (err) { res.end(JSON.stringify('Error')); }

});

router.post('/Login',
	passport.authenticate('local'),
	async (req, res) => {

		if (!req.user) {
			console.log("after authenticate with user null");
			res.send("error");
		}
		else {
			console.log("after authenticate with user");
			//res.send(req.user.type);עובדדד
			let productCart = [];
			for (let i = 0; i < req.user.cart.length; i++) {
				let course = await Course.findOne({ _id: req.user.cart[i].courseId });
				productCart.push({
					id: course._id,
					name: course.name,
					price: course.price,
					photo: course.src,
					rating: Math.floor(Math.random() * 6),
					moreDetails: course.description,
					saved: true,
					quantity: req.user.cart[i].Qty
				});
			}
			console.log("after authenticate with user the cart is " + productCart);
			res.send(JSON.stringify({ "permission": req.user.type, "cartItems": productCart, "name": req.user.name }));
		}

	}
);
//let users=await User.REQUEST();
/* GET users listing. */


function SessionConstructor(userId, userType, details) {
	this.userId = userId;
	this.userType = userType;
	this.details = details;
}


//passport.serializeUser(User.serializeUser());
passport.serializeUser(function (user, done) {
	done(null, user._id);
});
passport.deserializeUser(User.deserializeUser());




/*router.post('/checkUser', async function (req, res) {
	//console.log("hi");
	let userName = req.body.UserName;
	let password1 = req.body.Password;
	let x = 'ERROR';
	let user = await User.REQUEST({ name: userName, password1: password1 });
	if (user[0] != undefined) {
		console.log("the user is: " + user[0]);
		//console.log("user id in checkUser is :"+JSON.stringify(user));
		x = "" + user[0].type;
	}
	console.log(x);
	console.log(JSON.stringify(x));
	res.end(JSON.stringify(x));
});


*/
router.post('/permissions', async function (req, res) {
	let userName = req.body.userName;
	let x = "Error";
	console.log(userName);
	let user = await User.findOne({ email: userName });
	console.log("the user id is:" + JSON.stringify(user));
	if (user != undefined)
		x = user.type;
	console.log("the premission is: " + JSON.stringify({ type: x }));
	res.end(JSON.stringify(x));
});

router.get('/usersTable', async function (req, res) {
	//let users2 = [];
	//let userName = req.query.UserName;
	//let permission;
	try {
		/*let user = await User.REQUEST({ name: userName });
		user = user[0];
		if (user != null) {
			permission = user.type;
			console.log("the premission in userPage is:" + permission);
		}
		if (permission == "employee") {
			let users2 = await User.REQUEST({ type: 'customer' });
			console.log("the users in getUsersPage:" + users2);
			res.render('partials/users-employee', { Users: users2 });
		}
		else {*/
		let users2 = await User.REQUEST({});
		//console.log("I am in else option in getUsers");
		if (users2 == {})
			console.log("I am in else option in getUsers and the first user is:" + users2[0]);
		users2.forEach(function (user) {
			console.log("the users in getUsersPage:" + user);
		});
		res.end(JSON.stringify(users2));
		//}
	}
	catch (err) { res.end(JSON.stringify('Error')); }
});

router.post('/AddUser', async function (req, res) {
	try {
		//console.log("Branch is:"+ req.body[3]);
		console.log("user email is:" + req.body.email);
		let user = [];
		user.push(req.body.email);
		user.push(req.body.name);
		user.push(req.body.password);
		user.push(req.body.type);
		user.push([]);
		user.push([]);
		user.push([]);
		console.log("Hello world from AddUser");
		await User.CREATE(user);
		console.log("Hello world from AddUser");
		res.end(JSON.stringify('OK'));
	}
	catch (err) { res.end(JSON.stringify('Error')); }
});
router.post('/removeUser', async function (req, res) {
	console.log("inRemove user: " + req.body.email);
	if (req.body == undefined) {
		console.log("!!!!!!!!!!!!!!!")
	}
	let x = 'Error';
	try {
		let users2 = await User.REQUEST({ email: req.body.email });
		await User.DELETE(users2[0]._id);
		x = 'OK';
		res.end(JSON.stringify(x));
	}
	catch (err) {
		res.end(JSON.stringify(x));
	}

});
router.post('/UpdateUser', async function (req, res) {
	let res1 = 'ERROR';

	try {
		console.log("In updateUser  email:" + req.body.email);

		let users2 = await User.findOne({ email: req.body.email });
		console.log("In updateUser :" + users2);
		console.log("In updateUser :" + users2._id);
		await User.DELETE(users2._id);
		console.log("In updateUser :" + req.body.name);
		let user = [];
		//	console.log("In updateUser :" +req.body.name);
		user.push(req.body.email);
		user.push(req.body.name);
		user.push(req.body.password);
		user.push(req.body.type);
		user.push(users2.cart);
		user.push(users2.savedCourses);
		user.push(users2.orders);
		//console.log("In updateUser user is:" + req.body);
		await User.CREATE(user);
		res1 = 'OK';
		res.end(JSON.stringify(res1));
	}
	catch (err) {
		console.log("!!!!!!" + err)
		res.end(JSON.stringify(res1));
	}
});
router.post('/AddCourseToSavedItems', async function (req, res) {
	try {
		console.log("user email is:" + req.body.email);
		//let course = {name:req.body.name,description:req.body.description,src:req.body.src,price:req.body.price};
		let cousre = await (await Course.findOne({ email: req.body.email }));
		let user2 = await User.findOne({ email: req.body.email });
		user2.savedCourses.push(course);
		await User.DELETE(user2._id);
		let user = [];
		//	console.log("In updateUser :" +req.body.name);
		user.push(user2.email);
		user.push(user2.name);
		user.push(user2.password);
		user.push(user2.type);
		user.push(user2.cart);
		user.push(user2.savedCourses);
		user.push(user2.orders);

		await User.CREATE(user);
		res.end(JSON.stringify('OK'));
	}
	catch (err) { res.end(JSON.stringify('Error')); }
});
router.post('/AddCourseToCart', async function (req, res) {
	try {
		console.log("user email is:" + req.body.email);
		let user2 = await User.findOne({ email: req.body.email });
		user2.cart.push({ courseId: req.body.courseId, Qty: 1 });
		await User.DELETE(user2._id);
		console.log("user to add is: " + user2);
		let user = [];
		//	console.log("In updateUser :" +req.body.name);
		user.push(user2.email);
		user.push(user2.name);
		user.push(user2.password1);
		user.push(user2.type);
		console.log("user2 cart " + user2.cart);
		user.push(user2.cart);
		console.log("user2 saved courses type " + user2.savedCourses.type);
		user.push(user2.savedCourses);
		console.log("user2 orders " + user2.orders);
		user.push(user2.orders);

		console.log("array user to add is: " + user);
		await User.CREATE(user);
		console.log("biiiii");
		res.end(JSON.stringify('OK'));
	}
	catch (err) { res.end(JSON.stringify('Error')); }
});

router.post('/RemoveCourseFromeCart', async function (req, res) {
	try {
		console.log("user email is:" + req.body.email);
		let user2 = await User.findOne({ email: req.body.email });
		for (let i = 0; i < user2.cart.length; i++) {
			if (user2.cart[i].courseId === req.body.courseId) {
				user2.cart.splice(i, 1);
				console.log("the index is " + i);
				break;
			}
		}
		await User.DELETE(user2._id);
		console.log("user to add is: " + user2);
		let user = [];
		//	console.log("In updateUser :" +req.body.name);
		user.push(user2.email);
		user.push(user2.name);
		user.push(user2.password1);
		user.push(user2.type);
		console.log("user2 cart " + user2.cart);
		user.push(user2.cart);
		console.log("user2 saved courses type " + user2.savedCourses.type);
		user.push(user2.savedCourses);
		console.log("user2 orders " + user2.orders);
		user.push(user2.orders);

		console.log("array user to add is: " + user);
		await User.CREATE(user);
		console.log("biiiii");
		res.end(JSON.stringify('OK'));
	}
	catch (err) { res.end(JSON.stringify('Error')); }
});

router.post('/IncreaseCourseFromeCart', async function (req, res) {
	try {
		console.log("user email in IncreaseCourseFromeCart is :" + req.body.email);
		let user2 = await User.findOne({ email: req.body.email });
		for (let i = 0; i < user2.cart.length; i++) {
			if (user2.cart[i].courseId === req.body.courseId) {
				user2.cart[i].Qty++;
				break;
			}
		}
		await User.DELETE(user2._id);
		console.log("user to add in IncreaseCourseFromeCart is: " + user2);
		let user = [];
		//	console.log("In updateUser :" +req.body.name);
		user.push(user2.email);
		user.push(user2.name);
		user.push(user2.password1);
		user.push(user2.type);
		console.log("user2 cart " + user2.cart);
		user.push(user2.cart);
		console.log("user2 saved courses type " + user2.savedCourses.type);
		user.push(user2.savedCourses);
		console.log("user2 orders " + user2.orders);
		user.push(user2.orders);

		console.log("array user to add is: " + user);
		await User.CREATE(user);
		console.log("biiiii");
		res.end(JSON.stringify('OK'));
	}
	catch (err) { res.end(JSON.stringify('Error')); }
});
router.post('/Checkout', async function (req, res) {
	try {
		let user2 = await User.findOne({ email: req.body.email });
		await User.DELETE(user2._id);
		user2.cart = [];
		console.log("user to add in Checkout is: " + user2);
		let user = [];
		//	console.log("In updateUser :" +req.body.name);
		user.push(user2.email);
		user.push(user2.name);
		user.push(user2.password1);
		user.push(user2.type);
		console.log("user2 cart " + user2.cart);
		user.push(user2.cart);
		console.log("user2 saved courses type " + user2.savedCourses.type);
		user.push(user2.savedCourses);
		console.log("user2 orders " + user2.orders);
		user.push(user2.orders);

		console.log("array user to add is: " + user);
		await User.CREATE(user);
		console.log("biiiii");
		res.end(JSON.stringify('OK'));
	}
	catch (err) { res.end(JSON.stringify('Error')); }
});



router.post('/DecreaseCourseFromeCart', async function (req, res) {
	try {
		console.log("user email is:" + req.body.email);
		let user2 = await User.findOne({ email: req.body.email });
		for (let i = 0; i < user2.cart.length; i++) {
			if (user2.cart[i].courseId === req.body.courseId) {
				user2.cart[i].Qty--;
				break;
			}
		}
		await User.DELETE(user2._id);
		console.log("user to add is: " + user2);
		let user = [];
		//	console.log("In updateUser :" +req.body.name);
		user.push(user2.email);
		user.push(user2.name);
		user.push(user2.password1);
		user.push(user2.type);
		console.log("user2 cart " + user2.cart);
		user.push(user2.cart);
		console.log("user2 saved courses type " + user2.savedCourses.type);
		user.push(user2.savedCourses);
		console.log("user2 orders " + user2.orders);
		user.push(user2.orders);

		console.log("array user to add is: " + user);
		await User.CREATE(user);
		console.log("biiiii");
		res.end(JSON.stringify('OK'));
	}
	catch (err) { res.end(JSON.stringify('Error')); }
});
/*
router.get('/getUser', async function (req, res) {

	let id = req.query.user;
	let user = await User.REQUEST({ _id: id });
	user = user[0];
	console.log("in get user: the user is-" + user);
	res.send(user);//JSON.stringify(users[i]));
});

*/
module.exports = router;
