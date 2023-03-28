const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        default: 0
    },
    link: {
        type: String
    }
},{
    timestamps: true
});


optionSchema.pre('save', function(next){
    let idString = this._id.toString();
    this.link = `http://localhost:8000/v1/options/vote/?id=${idString}`;
    next();
});


const Option = mongoose.model('Option', optionSchema);

module.exports = Option;