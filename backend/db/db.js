import sqlite3 from 'sqlite3'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

const db = new sqlite3.Database(join(__dirname, '../database.db'), (err) => {
    if(err){
        console.log('Erro ao conectar ao banco de dados: ', err.message)

    }else{
        console.log('Conectado ao banco de dados')
    }
});

const createTables = () => {
    const userTable = `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL
        password TEXT NOT NULL,
    )`

    const messageTable = `CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        message TEXT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id)
    )`

    db.serialize(()=>{
        db.run(userTable);
        db.run(messageTable);
    });
};

createTables();

export default db