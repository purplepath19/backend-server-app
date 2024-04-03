const { model, Schema } = require('mongoose');

const schoolSchema = new Schema (
{
    address: String,
    latitude: Number,
    longitude: Number,
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String, 
    },
    photo: {
        type: String,
        default: 'https://schooladvice.net/wp-content/uploads/2017/01/waldorf_academy-logo-1024x1024.jpg'
    },
    user: {type: Schema.Types.ObjectId, ref: "User"},
    reviews: [{type: Schema.Types.ObjectId, ref: "Review"}]
}

)


module.exports = model("School", schoolSchema);