import jwt from 'jsonwebtoken'
import { getUser } from '../services/userAuth.js';

export function CheckUserLoggedIn(req,res,next) {
    const token = req.cookies.uid;
    if(!token){
        return res.status(400).send("Not Logged In")
    }
    const user = getUser(token)
    if(!user){
        return res.status(403).send("Not Logged in")
    }
    req.user = user;

    next()
}
