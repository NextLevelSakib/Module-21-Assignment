import {JWT_SECRET,JWT_EXPIRATION_TIME} from "../config/config.js";
import jwt from 'jsonwebtoken';

export const EncodeToken = (email, user_id) => {

    const key = JWT_SECRET
    const EXPIRE = { expiresIn: JWT_EXPIRATION_TIME }
    const PAYLOAD = {email: email, user_id: user_id}
    return jwt.sign(PAYLOAD,key,EXPIRE)
}



//DecodeToken-- Always Use Try,Catch

export const DecodeToken = (token) => {
    try{
        return jwt.verify(token, JWT_SECRET)
    }catch (err){
        return null
    }
}



