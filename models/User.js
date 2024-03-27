// User schema blueprint: Models represent the structure of documents stored in mongoDB


const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      // required: true,
      unique: true,
    },


    // email: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },

    // password: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
