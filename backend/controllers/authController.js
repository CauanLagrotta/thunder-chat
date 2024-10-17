import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../db/db.js';
import dotenv from 'dotenv';

const saltRounds = 10;
const router = express.Router();

dotenv.config();

const generateToken = (email, id) =>{
    const payload = { email, id };
    const options = { expiresIn: "1d" };
    const secret = process.env.TOKEN
    return jwt.sign(payload, secret, options);
}

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.TOKEN, (err, decoded) => {
        if(err){
            console.log("Erro ao verificar token: ", err);
            return res.status(401).json({ message: 'Unauthorized' });
        }
        db.query("SELECT * FROM users WHERE id = ?", [decoded.id], (err, result) => {
            if(err || result.length === 0){
                console.log("Erro ao buscar usuário: ", err);
                return res.status(401).json({ message: 'usuario não encontrado' });
            }
            req.user = result[0];
            next();
        });
    });
};

app.get("/header", verifyUser, (req, res) => {
    res.status(200).send({message: "autenticação bem sucedida", user: req.user});
});

app.get("/logout", (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout bem sucedido" });    
});


app.post("/register", (req, res) =>{
    const { username, email, password } = req.body;
    const defaultStaffValue = 0;

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if(err){
            console.log("Erro ao buscar usuário: ", err);
            return res.status(500).json({ message: 'Erro ao registrar' });
        }

        if(result.length === 0){
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if(err){
                    console.log("Erro ao gerar hash: ", err);
                    return res.status(500).json({ message: 'Erro ao registrar' });
                }

                db.query("INSERT INTO users (username, email, password, staff) VALUES (?, ?, ?, ?)", [username, email, hash, defaultStaffValue], (err, result) => {
                    if(err){
                        console.log("Erro ao registrar: ", err);
                        return res.status(500).json({ message: 'Erro ao registrar' });
                    }

                    res.status(200).send({ message: 'Usuário registrado com sucesso' });
                });
            });
        } else{
            res.status(400).send({ message: 'Email já registrado' });
        }
        
    });
});

app.post("/login", (req, res) =>{
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if(err){
            console.log("Erro ao buscar usuário: ", err);
            return res.status(500).json({ message: 'Erro ao logar' });
        }

        if(result.leght > 0){
            bcrypt.compare(password, result[0].password, (err, match) =>{
                if(err){
                    console.log("Erro ao comparar senhas: ", err);
                }

                if(match){
                    const id = result[0].id;
                    const accessToken = jwt.sign({ id }, process.env.TOKEN, { expiresIn: "1d" });

                    res.cookie('token', accessToken)
                    res.send({message: "Login bem sucedido", accessToken: accessToken, user: result[0]});
                } else{
                    res.status(401).send({ message: 'senha invalida' });
                }
            })
        } else{
            res.status(401).send({ message: 'email não encontrado' });
        }
    });
});