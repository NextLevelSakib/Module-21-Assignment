import UserModel from "../models/userModel.js";
import mongoose from "mongoose";
import * as tokenUtility from "../utility/tokenUtility.js";
import {EncodeToken} from "../utility/tokenUtility.js";


export const Registration=async (req, res)=>{

    try{
        let reqBody = req.body;
        await UserModel.create(reqBody)

        return res.json({"Status":"Success", "Message":"Registration successful"})

    }catch (e) {
        return res.json({"Status":"Fail", "Message":"Failed"})
    }


}





export const Login = async (req, res) => {
    try{
        let reqBody = req.body;
        let data = await UserModel.findOne(reqBody)

        if(data===null){
            return res.json({"Status":"Fail", "Message":"Login failed"})
        }else{

            //Token Encode
            let token = EncodeToken(data['email'], data['_id'])

            //Cookie Creation
            let cookieOptions = {expires: new Date(Date.now() + 24*60*60*1000), httpOnly: true}
            res.cookie('token', token, cookieOptions)


            return res.json({"Status":"Success",Token: token, "Message":"Login successful"})
        }

    }catch (e) {
        return res.json({"Status":"Fail", "Message":"Failed"})
    }

}






export const SingleUserProfileRead = async (req, res) => {

    try{
        let UserId = req.headers.user_id

        let data = await UserModel.findOne({_id:UserId})

            return res.json({"Status": "Success", Data: data})
    }catch (e) {
        return res.json({"Status": "Success", Data: e.toString()})
    }
}




export const AllUserProfileRead = async (req,res) => {

    try{
        let data = await UserModel.find()

        if(data===null){
            return res.json({"Status": "Fail", "Message":"User Not Found"})
        }else{
            return res.json({"Status":"Success",Data: data})
        }
    }catch (e) {
        return res.json({"Status": "Fail", "Message": e.toString()})
    }



}



export const ProfileUpdate = async (req,res) => {

    try{
        let reqBody = req.body;
        let User_id = req.headers.user_id
        let data = await UserModel.updateOne({'_id':User_id},{$set: reqBody})

        return res.json({"Status":"Success","Message":"Profile successfully updated"})
    }catch (e) {
        return res.json({"Status": "Fail", "Message": e.toString()})
    }

}




export const ProfileDelete = async (req,res) => {

    try{
        let User_id = req.params.user_id
        let data = await UserModel.findOne({'_id':User_id})

        if(data===null){
            return res.json({"Status":"Fail", "Message":"User Not Found"})
        }else{
            await UserModel.deleteOne({'_id':User_id})
            return res.json({"Status":"Success","Message":"Profile successfully deleted"})
        }


    }catch (e) {
        return res.json({"Status":"Success","Message": e.toString()})
    }

}




