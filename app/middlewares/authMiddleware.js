import {DecodeToken} from "../utility/tokenUtility.js";

export default (req, res, next) => {


       let token = req.cookies['token']

        let Decoded = DecodeToken(token);

        if(Decoded===null){
            return res.json({"Status":"Fail", "Message":"Unauthorized"})
        }else{
            let email = Decoded['email']
            let User_id = Decoded['user_id']
            req.headers.email=email
            req.headers.user_id=User_id

            next()
        }
    }


