import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db/db.js';

const generateResetToken = (email, id) =>{
    const payload = { email, id };
    const options = { expiresIn: "1d" };
    const secret = process.env.TOKEN
    return jwt.sign(payload, secret, options);
}



const saltRounds = 10;