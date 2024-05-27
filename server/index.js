import express from "express";
import dotenv from "dotenv";
import db from "./config/Database.js";
// import Users from "./models/UserModel.js";  >>> membuat tabel
import cookieParser from "cookie-parser";
import cors from 'cors';
import router from "./routes/index.js";
const app = express();
dotenv.config();


// cek koneksi database
try {
    await db.authenticate();
    console.log('Database Connected....');
    // await Users.sync();   >>> membuat tabel
} catch (error) {
    console.error(error);
};

// { credentials: true, origin: 'http://localhost:3000' }
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(8080, () => {
    console.log('server running at port 8080');
});