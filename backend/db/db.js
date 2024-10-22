import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, "../database.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados: ", err);
  } else {
    console.log("Conectado ao banco de dados");
  }
});

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        useremail TEXT NOT NULL UNIQUE,
        userpassword TEXT NOT NULL,
        staff INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    (err) => {
      if (err) {
        console.log("Erro ao criar tabela de usuários: ", err);
      } else {
        console.log("Tabela de usuários criada");
      }
    }
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        message TEXT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
        )`,
    (err) => {
      if (err) {
        console.log("Erro ao criar tabela de mensagens: ", err);
      } else {
        console.log("Tabela de mensagens criada");
      }
    }
  );
});


export default db;
