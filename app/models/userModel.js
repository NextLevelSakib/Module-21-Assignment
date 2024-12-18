import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    NIDNumber: {type: String, required: true, unique: true},
    phoneNumber: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    bloodGroup: {type: String, required: true}
},
    {timestamps: true, versionKey: false}


)




let UserModel = mongoose.model("users", userSchema);




export default UserModel;









