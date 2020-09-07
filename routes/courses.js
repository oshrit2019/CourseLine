var express = require('express');
var router = express.Router();
const Course = require('../model')("Course");
const User = require('../model')("User");
const connectEnsureLogin = require("connect-ensure-login");


router.get('/getCatalog2', async function (req, res) {
	try {
		let courses = await Course.REQUEST();
		console.log("the courses are " + courses);

		res.end(JSON.stringify(courses));
	}
	catch (err) { res.end(JSON.stringify('Error')); }
});


router.post('/getCatalog', async function (req, res) {
	try {
		console.log("req.body.userName getCatalog Items " + JSON.stringify(req.body));
		let user = await User.findOne({ email: req.body.email });
		console.log("user in server getCatalog Items !!!" + user);
		console.log("user saved items in server " + user.savedCourses);
		let courses = await Course.REQUEST();
		let productCart = [];
		let product = {};
		//let saved = false;
		console.log("courses in getCatalog: " + courses);
		for (let i = 0; i < courses.length; i++) {
			//let course = await Course.findOne({ _id: req.user.savedCourses[i].courseId });
			if (user.savedCourses !== undefined && user.savedCourses.includes(courses[i]._id)) {
				product = {
					"_id": courses[i]._id,
					"name": courses[i].name,
					"price": courses[i].price,
					"src": courses[i].src,
					"description": courses[i].description,
					"saved": true
				}
				productCart.push(product);
				console.log("course id in saved item " + courses[i]._id);
				console.log("the value of saved key: " + product.saved);
			}
			else {
				console.log("course id is not in saved item " + courses[i]._id);
				product = {
					"_id": courses[i]._id,
					"name": courses[i].name,
					"price": courses[i].price,
					"src": courses[i].src,
					"description": courses[i].description,
					"saved": false
				}
				productCart.push(product);
				console.log("course id in saved item " + courses[i]._id);
				console.log("the value of saved key: " + product.saved);

			}
			console.log("after if ");

			/*productCart.push({
				id: item._id,
				name: item.name,
				price: item.price,
				photo: item.src,
				rating: Math.floor(Math.random() * 6),
				moreDetails: item.description,
				saved: saved,
			});*/

		}

		console.log("products in cart " + JSON.stringify(productCart));
		let result = { array: productCart }
		/*var result = {};
		console.log("products length in cart " + courses.length);
		for (var i = 0; i < courses.length; i++) {
			result[courses[i].key] = courses[i];
		}*/
		console.log("products in cart object of objects" + JSON.stringify(result));
		res.send(JSON.stringify(result));
	}
	catch (err) { res.end(JSON.stringify('Error')); }

});



/*מכאן תוספת חדשה*/
let fs = require('fs');
var multer = require('multer');
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/images');
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
		cb(null, uniqueSuffix + '-' + file.originalname);
	}
});


var upload = multer({ storage: storage });

/*עד כאן*/


router.post('/AddCourse', async function (req, res) {

	console.log("body in post: " + JSON.stringify(req.body));
	try {
		let data = req.body;
		let course = [];
		console.log("body in post: " + JSON.stringify(req.body.name));

		course[0] = data.name;
		course[1] = data.description;
		course[2] = data.src;
		course[3] = data.price;
		//console.log("file image: " + req.file);
		/*if (req.file) {
			if (req.file.filename != null) {
	
				flower[2] = "images/" + req.file.filename;
				console.log("the file name is:" + req.file.filename);
				console.log("flower[2]= " + flower[2]);
				await Flower.CREATE(flower);
			}
		}
		else if (data.src != null) {
			flower[2] = data.src;
			await Flower.CREATE(flower);
	
		}*/
		await Course.CREATE(course);
		res.end(JSON.stringify('OK'));
	}
	catch (err) {
		res.end(JSON.stringify('Error'));

	}
});

router.post('/removeCourse', async function (req, res) {
	console.log("inRemove Course: " + req.body.name);
	if (req.body == undefined) {
		console.log("!!!!!!!!!!!!!!!")
	}
	let x = 'Error';
	try {
		let course = await Course.findOne({ name: req.body.name });
		console.log(req.body.name);
		await Course.DELETE(course._id);
		x = 'OK';
		res.end(JSON.stringify(x));
	}
	catch (err) {
		res.end(JSON.stringify(x));
	}

});
router.post('/UpdateCourse', async function (req, res) {
	let res1 = 'ERROR';

	try {
		console.log(req.body)
		let course = await Course.findOne({ name: req.body.name1 });
		console.log("In Update Course :" + course);
		console.log("In update Course :" + course._id);
		await Course.DELETE(course._id);
		console.log("In update Course :" + req.body.name);
		let course2 = [];
		course2.push(req.body.name2);
		course2.push(req.body.description);
		course2.push(req.body.src);
		course2.push(req.body.price);
		await Course.CREATE(course2);
		res1 = 'OK';
		res.end(JSON.stringify(res1));
	}
	catch (err) {
		console.log("!!!!!!" + err)
		res.end(JSON.stringify(res1));
	}
});


module.exports = router;
