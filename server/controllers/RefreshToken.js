import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        console.log("ini refresh token", refreshToken);

        if(!refreshToken) {
            console.log('Tidak ada token penyegaran yang ditemukan');
            return res.sendStatus(401).json({msg: "tidak terdapat resfres token"});
        }
        const user = await Users.findAll({
            where: {
                refresh_token: refreshToken
            }
        });
        console.log('User:', user);

        if (!user[0]) {
            console.log('User not found');
            return res.sendStatus(403).json({ msg: "token tidak cocok" });
        }
            


        //jika token cocok
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.log('Token verification error:', err);
                return res.sendStatus(403).json({ msg: "gagal mencocokan token" });
            }
                

            // jika tidak error diambil value
            const userId = user[0].id;
            const name = user[0].name;
            const email = user[0].email;

            console.log('User Data:', { userId, name, email }); 

            const accesToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            });
            console.log('Token Akses yang Dihasilkan:', accessToken);
            res.json({accesToken})
        })
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}