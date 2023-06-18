import {usuariosModel} from "../models/usuarios.model.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { handleErrors } from "../database/error.js";
import Joi from "joi";


const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    rol: Joi.string().required(),
    lenguage: Joi.string().required(),
  });

const regitrarUsuario = async (req,res)=>{

    try {
        const { error, value } = registerSchema.validate(req.body);
        if (error) {
           throw { code: "402", message: error.details[0].message };
        }
    
        const { email, password, rol, lenguage } = value;
        const hashPassword = await bcrypt.hash(password, 10);
        const result = await usuariosModel.registreUsuario(
        email,
        hashPassword,
        rol,
        lenguage
        );
        return res.json({ ok: true, result: result.rows[0] });
      } catch (error) {
        const { status, message } = handleErrors(error.code);
        console.log(error, message);
        return res.status(status).json({ ok: false, result: message });
      }
    }

   

const loginUsuarios = async (req, res)=>{
    const { email} = req.body
    try {
        //validación parámetros en middleware
        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION,
        })
        console.log("Token: ", token)
        if (result.length === 0) {
            // throw { code: "404" };
            throw { message: "email no registrado"};

          }
        res.json(token)
    } catch (error) {
        const { status, message } = handleErrors(error.code)
        console.log(error, message)
        return res.status(status).json({ ok: false, result: message });
    }
}

const contenidoUsuario = async (req, res) => {
    const userEmail = req.email
    try {
        const result = await usuariosModel.verUsuario(userEmail);
        const {email, rol, lenguage} = result;
        console.log("-----------------------------")
        console.log("Usuario encontrado: ", result)
        return res.json({email, rol, lenguage});
    } catch (error) {
        console.log(error)
        const { status, message } = handleErrors(error.code)
        return res.status(status).json({ ok: false, result: message });
    }
}

export const todoController = {
    regitrarUsuario,
    loginUsuarios,
    contenidoUsuario
}


