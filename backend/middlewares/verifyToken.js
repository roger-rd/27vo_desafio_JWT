import * as dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import {usuariosModel} from "../models/usuarios.model.js"
import { handleErrors } from "../database/error.js";


export const verifyToken = ( req, res, next)=>{
    try {
        const bearerHeaders = req.headers.authorization;
        if(!bearerHeaders){
            throw{message:"se necesita el token con formato Bearer"}
        }
        const token = bearerHeaders.split(" ")[1];

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        console.log(payload);

        req.email = payload.email;

        next();

    } catch (error) {
        console.log(error)
        res.status(500).json({ok:false, message:error.message})
    }

}
export const verifyUsuario = async (req, res, next) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            throw { code: "403" };
        }

        const { rows: [userDB], rowCount } = await usuariosModel.loginUsuarios(email);

        if (!rowCount) {
            throw { code: "error en email" };
        }

        const validatePassword = await bcrypt.compare(password, userDB.password);
        if (validatePassword == false) {
            throw { code: "error de contraseña" };
        }

        console.log("Usuario autenticado con éxito: ", userDB.email)
        next()
    } catch (error) {
        const { status, message } = handleErrors(error.code)
        console.log(error, message)
        return res.status(status).json({ ok: false, result: message });
    }
}
export const reportQuery = async (req, res, next) => {
    const url = req.url
    const method = req.method
    console.log(`
    Hoy ${new Date()}
    Se ha recibido una consulta ${method} en la ruta ${url} 
    `)
    next();
}