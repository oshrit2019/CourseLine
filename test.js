const debug = require('debug')('lab4:test');
const User = require('./model')("User");
const Branch = require('./model')("Branch");
const Flower = require('./model')("Flower");
const prompt = require('./prompt');

(async () => {
 
let user = [];
    console.log();
    //user[0] = await prompt("Please enter user's name: ");
    //user[1] = await prompt('Please enter id: ');
    //user[2] = await prompt('Please enter password: ');
    //user[3] = await prompt('Please enter type: ');
    //console.log(user);
	let users = [['Bracha',123 ,'1234567' ,'manager' ],
                 [ 'Oshrit', 456 , '1234567','manager'],
				 [ 'Efrat', 789 , '1234567' ,'customer'],
				 [ 'Shoshi', 101 , '1234567', 'customer'],
				 [ 'zer4u', 121 , '1234567' , 'supplier' ],
                 [ 'flowers4u', 1415 , '1234567' , 'supplier' ],
				 [ 'Yosi',  1617  , '1234567' , 12 ,'employee' ],
                 [  'David', 1819 ,'1234567' ,  15 ,'employee' ]
               ];
			   
let branches = [ [ 15, 'JERUSALEM', 'Jerusalem, Yafo 90','02-5286997',  'true'],
                 [12, 'ASHDOD','Ashdod, Beni Brit 10','08-6974105', 'true'],
				 [20,'BEIT-SHEMESH', 'Beit-Shemesh, Keren Hayesod 9','02-9941578','true']
               ];	
let flowers = [ [ 'Rose',   'red',  'images/Red_Rose.jpg' , 10],
                 [  'purpurascens',   'pink',  'images/purpurascens.jpg' , 15],
                 ['Hazav',   'brown',  'images/Hazav.jpg' , 11],
                 [  'Chrysanthemum',   'white',  'images/Chrysanthemum.jpg' , 18],
                 [  'Viole',   'purple',  'images/Viole.jpg' , 9]
               ];
    try {
        //await User.CREATE(user);
       //// console.log('User created:' + user);
		users.forEach(async item => await User.CREATE(item));
		branches.forEach(async item => await Branch.CREATE(item));
		flowers.forEach(async item => await Flower.CREATE(item));	
		} catch(err) { throw err; }
    //console.log(await User.REQUEST({name: await prompt('Please enter username: ')}));
})();
