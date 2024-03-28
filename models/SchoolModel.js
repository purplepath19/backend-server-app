const { model, Schema } = require('mongoose');

const schoolSchema = new Schema (
{
    position: {
        type: String,
    },
    title: {
        type: String,
    },
    content: {
        type: String, 
    }
}

)


module.exports = model("SchoolModel", schoolSchema);