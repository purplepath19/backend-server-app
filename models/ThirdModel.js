const { model, Schema } = require('mongoose')

const reviewSchema = new Schema(
    {

        author: {type: Schema.Types.ObjectId, ref: "User"},
        rating: {
            type: Number,
            min: 0,
            max: 5
        },
        comment: String
    },
    {
        timestamps: true
    }
)

module.exports = model('Review', reviewSchema)
  