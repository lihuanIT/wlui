import mongoose from 'mongoose';

let ComponentSchema = mongoose.Schema({
	name 		: String,//the name of component
    filePath    : String,//the file path of where component sourc code store
    description : String,//the introduction of this component,or anything else you want to say
    author      : String,//the author of this component,eg:mickey wang
    version     : String,//current version
    props       : [
        {
            name    :String,//property name
            desc    :String,//description of the property
            type    : {type: String, enum: ["bool","object","function"]},//
            defaultValue : String

        }
    ],
    samples  : [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Sample'}
    ], //
	useCases  : [
        String
    ],
    supportAntVersion: String,
    type: String,
    isContainer: Boolean,
    logs : [
        mongoose.Schema.Types.Mixed
    ],
    isRemoved:{ type : Boolean, default: false },
    created     : { type : Date, default: Date.now },
	updated     : { type : Date, default: Date.now },
	template: String
});
ComponentSchema.pre('save', function (next) {
    this.updated = new Date();
    next();
});

export default mongoose.model('Component', ComponentSchema);
