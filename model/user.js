const debug = require("debug")("lab4:model-user");
const mongo = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");


module.exports = db => {
    // create a schema
    let schema = new mongo.Schema({
        email: { type: String, unique: true, required: true },
        name: { type: String },
        password1: { type: String, required: true },
        numOfBranch: { type: Number, required: false },
        type: { type: String, enum: ["manager", "customer", "supplier", "employee"] },
        cart: { type: Array, required: false },
        savedCourses: { type: Array, required: false },
        orders: { type: Array, required: false },

    }, { autoIndex: true });

    // custom method to add string to end of name
    // you can create more important methods like name validations or formatting
    // you can also do queries and find similar users
    /*schema.methods.dudify = function() {
        // add some stuff to the users name
        this.name = this.name + '-dude';
        return this.name;
    };*/

    schema.statics.CREATE = async function (user) {
        debug("create \n");
        return this.create({
            email: user[0],
            name: user[1],
            password1: user[2],
            type: user[3],
            cart: user[4],
            savedCourses: user[5],
            orders: user[6]
        });

    };

    // on every save, add the date
    schema.pre('save', function (next) {
        //אם נרצה להוסיף שכלולים של בדיקות וכאלה אז כאן יהיה קריאה לפונקציות שעושות בדיקות אלה
        next();
    });

    schema.statics.REQUEST = async function () {
        debug('I am in REQUEST function');
        // no arguments - bring all at once
        const args = Array.from(arguments); // [...arguments]
        if (args.length === 0) {
            debug("request: no arguments - bring all at once");
            return this.find({}).exec();
        }

        // perhaps last argument is a callback for every single document
        let callback = arguments[arguments.length - 1];
        if (callback instanceof Function) {
            let asynch = callback.constructor.name === 'AsyncFunction';
            debug(`request: with ${asynch ? 'async' : 'sync'} callback`);
            args.pop();
            let cursor, user;
            try {
                cursor = await this.find(...args).cursor();
            } catch (err) { throw err; }
            try {
                while (null !== (user = await cursor.next())) {
                    if (asynch) {
                        try {
                            await callback(user);
                        } catch (err) { throw err; }
                    }
                    else {
                        callback(user);
                    }
                }
            } catch (err) { throw err; }
            return;
        }

        // request by id as a hexadecimal string
        if (args.length === 1 && typeof args[0] === "string") {
            debug("request: by ID");
            return this.findById(args[0]).exec();
        }

        // There is no callback - bring requested at once
        debug(`request: without callback: ${JSON.stringify(args)}`)
        //debug(await this.find(...args).exec());
        let cursor = await this.find(...args).cursor();
        let result = [];
        while (null !== (user = await cursor.next())) {
            result.push(user);
            debug("user in REQUEST" + user);
        }
        return result;
    };
    schema.statics.DELETE = async function (id) { return this.findByIdAndRemove(id).exec(); };


    schema.plugin(passportLocalMongoose, { usernameField: "email" });

    // the schema is useless so far
    // we need to create a model using it
    // db.model('User', schema, 'User'); // (model, schema, collection)
    db.model('User', schema); // if model name === collection name
    debug("User model created");
};
