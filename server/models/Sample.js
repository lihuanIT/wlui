import mongoose from 'mongoose';

let SampleSchema = mongoose.Schema({
	title		:String,
	description :String,
	sourceCode	:String,
	component:{type: mongoose.Schema.Types.ObjectId, ref: 'Component'},
    created     : { type : Date, default: Date.now },
});

export default mongoose.model('Sample', SampleSchema);
