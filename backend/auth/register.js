import bcrypt from "bcrypt";
import express from "express";
import db from "../db/db.js";

const saltRounds = 10;
const registerRoute = express.Router();

registerRoute.post("/", (req, res) => {
  const { username, useremail, userpassword } = req.body;
  const defaultStaffValue = 0;

  db.get("SELECT * FROM users WHERE useremail = ? OR username = ?", [useremail, username], (err, user) => {
    if (err) {
      console.error("Erro ao verificar email:", err);
      console.error("Erro ao verificar username:", err);
      return res.status(500).send({ msg: "Erro no servidor" });
    }
    if (!user) {
      bcrypt.hash(userpassword, saltRounds, (err, hash) => {
        if (err) {
          console.error("Erro ao criptografar a senha:", err);
          return res.status(500).send({ msg: "Erro ao criptografar a senha" });
        }
        
        db.run(
          "INSERT INTO users (username, useremail, userpassword, staff) VALUES (?, ?, ?, ?)",
          [username, useremail, hash, defaultStaffValue],
          (err) => {
            if (err) {
              console.error("Erro ao cadastrar usuário:", err);
              return res.status(500).send({ msg: "Erro ao cadastrar usuário" });
            }
            res.send({ msg: "Cadastrado com sucesso!" });
          }
        );
      });
    } else {
      res.status(400).send({ msg: "Email ou nome já existem" });
    }
  });
});

export default registerRoute;
