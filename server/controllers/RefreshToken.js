import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        console.log("ini refresh token", refreshToken);
        if(!refreshToken) return res.sendStatus(401).json({msg: "tidak terdapat resfres token"});
        const user = await Users.findAll({
            where: {
                refresh_token: refreshToken
            }
        });
        if (!user[0]) return res.sendStatus(403).json({ msg: "token tidak cocok" });

        //jika token cocok
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403).json({ msg: "gagal mencocokan token" });

            // jika tidak error diambil value
            const userId = user[0].id;
            const name = user[0].name;
            const email = user[0].email;
            const accesToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            });
            res.json({accesToken})
        })
    } catch (error) {
        console.log(error);
    }
}