const mongoose =require( "mongoose");

const userSchema=mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter your email"],
    default:null,
    unique: true,
    // validate: [validator.isEmail, "Please enter a valid email"],
  },
  mobile: {
    type: String,
    required: [true, "Please Enter your email"],
    default:null,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter your password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,

  },


  createdAt: {
    type: Date,
    default: Date.now,
  },

});




module.exports= mongoose.model("User", userSchema);
