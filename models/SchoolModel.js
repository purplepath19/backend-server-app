const { model, Schema } = require('mongoose');

const schoolSchema = new Schema (
{
    position: {
        type: String,
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String, 
    }
}

)


module.exports = model("schools", schoolSchema);