const debug = require("debug")("lab4:model-branch");
const mongo = require("mongoose");

module.exports = db => {
    // create a schema
    let schema = new mongo.Schema({
		_id: { type: Number, required: true, unique: true, index: true },
        name: {type: String,required: true, unique: true, index: true },
        address: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        active: Boolean,    
    }, { autoIndex: false });

     /*schema.methods.dudify = function() {
       
    };*/

    schema.statics.CREATE = async function(branch) {
        return this.create({
			_id:branch[0],
            name: branch[1],
            address: branch[2],
            phoneNumber: branch[3],
            active: branch[4]
        });
    };

    // on every save, add the date
    schema.pre('save', function(next) {
		//אם נרצה להוסיף שכלולים של בדיקות וכאלה אז כאן יהיה קריאה לפונקציות שעושות בדיקות אלה
        next();
    });

    schema.statics.REQUEST = async function() {
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
            debug(`request: with ${asynch?'async':'sync'} callback`);
            args.pop();
            let cursor, branch;
            try {
                cursor = await this.find(...args).cursor();
            } catch (err) { throw err; }
            try {
                while (null !== (branch = await cursor.next())) {
                    if (asynch) {
                        try {
                            await callback(branch);
                        } catch (err) { throw err; }
                    }
                    else {
                        callback(branch);
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
		let cursor= await this.find(...args).cursor();
		let result=[];
		while(null!==(branch=await cursor.next()))
		{
			result.push(branch);
			debug("branch in REQUEST"+branch);
		}
		return result;
    };
	    schema.statics.DELETE = async function(name) { return this.findByIdAndRemove(name).exec(); };



    db.model('Branch', schema); // if model name === collection name
    debug("Branch model created");
};
