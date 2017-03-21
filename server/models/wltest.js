import mongoose from 'mongoose';

let WltestSchema = mongoose.Schema({
	name 		: String,
    created     : { type : Date, default: Date.now },
});

export default mongoose.model('Wltest', WltestSchema);
