import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isBlock:{
        type:Boolean,
        default:false
    },
    type:{
        type:Boolean,
        default:"customer"
    },
    profilePictuer:{
        type:String,
        default:""
    }
})
const user = mongoose.model("users",userSchema)

export default user;