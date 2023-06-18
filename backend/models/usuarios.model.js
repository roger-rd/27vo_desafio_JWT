import {pool} from "../database/connection.js";


class ValidationException extends Error{
    constructor(message){
        super(message);
        this.name = "ValidationException"
        
    }
}

const validateEmail = (email) => {
    if (!email) {
    throw new ValidationException("Se necesita el email");
    }
};

const validatePassword = (password) => {
    if (!password) {
    throw new ValidationException("Se necesita contraseña");
    }
};

const validateRol = (rol) => {
    if (!rol) {
    throw new ValidationException("Se necesita el rol");
    }
};

const validateLenguage = (lenguage) => {
    if (!lenguage) {
    throw new ValidationException("Se necesita el lenguaje");
    }
};

const registreUsuario = async (email, password,rol,lenguage) =>{

    try {
        validateEmail(email);
        validatePassword(password);
        validateRol(rol);
        validateLenguage(lenguage);
    
        const text = 
        "INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING email, rol, lenguage"
        const { rows } = await pool.query(text, [email, password, rol, lenguage])
        return { rows }
    } catch (error) {
        console.log(error)
        throw error
    }
}

const loginUsuarios = async(email)=>{
    try {
        validateEmail(email)

        const text = "SELECT * FROM usuarios WHERE email = $1";
        const result = await pool.query(text, [email]);   
        return result;
    } catch (error) {
        console.log(error)
        throw error
    } 
}

const verUsuario = async (email) => {
    try {
        validateEmail(email);

        const text = "SELECT email, rol, lenguage FROM usuarios WHERE email = $1";
        
        const {rows} = await pool.query(text, [email])
        return rows[0]
    } catch (error) {
        console.log(error)
        throw error
    }
}


export const usuariosModel ={
    registreUsuario,
    loginUsuarios,
    verUsuario
}

