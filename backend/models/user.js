const { Schema, model } = require("mongoose");
const Review = require("./review");

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required:true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum:["user","admin"],
    default:"user"
    
  },
  profileImg:{
    type:String,
  },
  favs:[
     {
      type:Schema.Types.ObjectId,
      ref:"Place",
      default:[]
     }
  ],
  resetPasswordToken: String,
  resetPasswordExpires: Date,
 
},{versionKey:false});


userSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    try {
      // Delete all reviews associated with the deleted user
      await Review.deleteMany({ user: doc._id });
     
      console.log("Associated reviews deleted successfully.");
    } catch (err) {
      console.error("Error deleting associated reviews:", err);
    }
  }
});


const User = model("User", userSchema);

module.exports = User;
