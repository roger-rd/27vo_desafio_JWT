import * as dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken"


export const verifyToken = ( req, res, next)=>{
    try {
        const bearerHeaders = req.headers.authorization
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
export const reportQuery = async (req, res, next) => {
    const url = req.url
    const method = req.method
    console.log(`
    Hoy ${new Date()}
    Se ha recibido una consulta ${method} en la ruta ${url} 
    `)
    next() 
}