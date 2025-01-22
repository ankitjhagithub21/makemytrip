const { Schema, model } = require("mongoose");

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
  ]
 
},{versionKey:false});


const User = model("User", userSchema);

module.exports = User;
