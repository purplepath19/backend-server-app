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
    },
    user: {type: Schema.Types.ObjectId, ref: "User"},
    reviews: [{type: Schema.Types.ObjectId, ref: "Review"}]
}

)


module.exports = model("schools", schoolSchema);