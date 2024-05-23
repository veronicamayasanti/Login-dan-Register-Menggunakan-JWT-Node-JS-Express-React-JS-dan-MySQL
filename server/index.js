import express from "express";
import db from "./config/Database.js";
// import Users from "./models/UserModel.js";  >>> membuat tabel
import router from "./routes/index.js";
const app = express();


// cek koneksi database
try {
    await db.authenticate();
    console.log('Database Connected....');
    // await Users.sync();   >>> membuat tabel
} catch (error) {
    console.error(error)
}

app.use(express.json())
app.use(router)
app.listen(5000, () => {
    console.log('server running at port 5000');
})