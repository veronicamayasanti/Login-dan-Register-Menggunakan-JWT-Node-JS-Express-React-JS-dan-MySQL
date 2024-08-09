import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'name', 'email']
        })
        res.json(users);
      
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error fetching users" });
    }
}


export const Register = async (req, res) => {
    const { name, email, password, confPassword } = req.body;
    if (password !== confPassword) {
        return res.status(400).json({ msg: "Password dan Confirmasi Password tidak cocok" });
    }
    // Hash password and create user
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        // Check if email exists
        const emailExists = await Users.findOne({ where: { email: email } });
        if (emailExists) {
            return res.status(400).json({ msg: "Email sudah digunakan" });
        }

        await Users.create({
            name: name,
            email: email,
            password: hashPassword
        });
        res.json({ msg: "Register Berhasil" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
};


export const Login = async (req, res) => {
    try {
        const user = await Users.findAll({ // mencari user berdasarkan email
            where: {
                email: req.body.email
            }
        });
        //jika email sudah cocok antara input dan database
        // selanjutnya mencocokan password
        const match = await bcrypt.compare(req.body.password, // ini password yang di kirimkan oleh client
        user[0].password); // ini password yang ada di database, [0] index ke 0 karena single data
        if (!match) return res.status(400).json({ msg: "Wrong Password" });
  
        // jika password cocok maka mengambil data dari database
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;

        console.log("ACCESS_TOKEN_SECRET:", process.env.ACCESS_TOKEN_SECRET);
        console.log("REFRESH_TOKEN_SECRET:", process.env.REFRESH_TOKEN_SECRET);

        const accesToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });

        // simpan refrestoken ke dalam database
        await Users.update({ refresh_token: refreshToken }, {
            where: {
                id: userId
            }
        });

        // http only cookie yang dikirim ke client
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({  accesToken })
    } catch (error) {
     res.status(404).json({msg: "email tidak ditemukan"})
    }
}

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    console.log(refreshToken);
    if (!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);

}
