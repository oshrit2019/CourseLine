const debug = require("debug")("lab4:model");
const mongo = require("mongoose");
//mongo.Promise = Promise;

//let db = mongo.createConnection('mongodb://localhost:27017/lab-mongo-5778', { useMongoClient: true });
//db.then(() => debug("Connected to DB"));
//db.catch(err => debug("Error connecting to DB: " + err));

let URI="mongodb+srv://oshritVidal:Oshrit2020@cluster0.oqvja.mongodb.net/CourseLine?retryWrites=true&w=majority"
let db = mongo.createConnection();
(async () => {
    try {
        await db.openUri(URI);
    } catch (err) {
        debug("Error connecting to DB: " + err);
    }
})();
debug('Pending DB connection');

require("./user")(db);
require("./branch")(db);
require("./course")(db);

module.exports = model => db.model(model);
