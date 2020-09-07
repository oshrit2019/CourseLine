var express = require('express');
var router = express.Router();
const Branch = require('../model')("Branch");

router.get('/branchesPage',async function(req,res){
	let branches2= await Branch.REQUEST({active:true});
	console.log(branches2);
	res.render('partials/branches', {branches:branches2});
	
});
module.exports = router;
