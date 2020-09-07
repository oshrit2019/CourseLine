const debug = require("debug")("lab4:model-courses");
const mongo = require("mongoose");

module.exports = db => {
    // create a schema
    let schema = new mongo.Schema({
        name: { type: String, required: true, unique: true, index: true },
        description: { type: String, required: true },
        category: { type: String, enum: ["Sport", "Computers", "Art", "Mathematic"] },
        src: { type: String },
        price: Number,
    }, { autoIndex: false });

    /*schema.methods.dudify = function() {
      
   };*/

    schema.statics.CREATE = async function (course) {
        // if (course.length == 4) {
        return this.create({
            name: course[0],
            description: course[1],
            // category: course[2],
            src: course[2],
            price: course[3]
        });

        /* }
         else {
             return this.create({
                 name: course[0],
                 description: course[1],
                 src: course[2],
                 price: course[3]
             });
         }*/
    };

    // on every save, add the date
    schema.pre('save', function (next) {
        //אם נרצה להוסיף שכלולים של בדיקות וכאלה אז כאן יהיה קריאה לפונקציות שעושות בדיקות אלה
        next();
    });

    schema.statics.REQUEST = async function () {
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
            let cursor, course;
            try {
                cursor = await this.find(...args).cursor();
            } catch (err) { throw err; }
            try {
                while (null !== (course = await cursor.next())) {
                    if (asynch) {
                        try {
                            await callback(course);
                        } catch (err) { throw err; }
                    }
                    else {
                        callback(course);
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
        debug(`request: without callback: ${JSON.stringify(args)}`);
        //return this.find(...args).exec();
        let cursor = await this.find(...args).cursor();
        let result = [];
        while (null !== (course = await cursor.next())) {
            result.push(course);
            debug("course in REQUEST" + course);
        }
        return result;
    };
    schema.statics.DELETE = async function (name) { return this.findByIdAndRemove(name).exec(); };


    db.model('Course', schema); // if model name === collection name
    debug("Course model created");
};
