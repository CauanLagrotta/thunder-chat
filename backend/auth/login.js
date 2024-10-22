import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import express from "express";
import db from "../db/db.js";

const loginRoute = express.Router();
//login
loginRoute.post("/", (req, res) => {
  const { useremail, userpassword } = req.body;

  db.get("SELECT * FROM users WHERE useremail = ?", [useremail], (err, user) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (user) {
      bcrypt.compare(userpassword, user.userpassword, (err, match) => {
        if (err) {
          return res.status(500).send(err);
        }
        if (match) {
          const id = user.id;
          const accessToken = jwt.sign({ id }, process.env.TOKEN, {
            expiresIn: "1d",
            
          });

          res.cookie("token", accessToken);
          res.send({ msg: "Login efetuado com sucesso", accessToken });
        } else {
          res.status(400).send({ msg: "Senha inválida" });
        }
      });
    } else {
      res.status(404).send({ msg: "Email não encontrado" });
    }
  });
});

//header
loginRoute.get("/header", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send({ msg: "Autenticação inválida" });
  }

  jwt.verify(token, process.env.TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).send({ msg: "Autenticação inválida" });
    }
    
    db.get("SELECT * FROM users WHERE id = ?", [decoded.id], (err, user) => {
      if (err || !user) {
        return res.status(401).send({ msg: "Usuário não encontrado" });
      }
      res.status(200).send({ msg: "Autenticação bem-sucedida" });
    });
  });
});

//logout
loginRoute.get("/", (req, res) => {
  res.clearCookie("token");
  res.status(200).send({ msg: "Logout bem-sucedido" });
});

export default loginRoute;
