import { Router } from "express";
import { todoController } from "../controllers/usuarios.controllers.js";
import { handleErrors } from "../database/error.js";
import  {verifyToken,reportQuery}  from "../middlewares/verifyToken.js";


const router = Router()

router.get("/", (req, res) => {
    res.json({ok: true, result: "All ok in the root path"})
})

router.get("/usuarios", verifyToken,reportQuery, async(req,res) => {
    try {
        await todoController.contenidoUsuario(req,res)
    } catch (error) {
        console.log(error)
        const {status, message} = handleErrors(error.code)
        res.status(status).json({ok:false, return:message});
    }
});

router.post("/usuarios", reportQuery, async (req,res)=>{
    try {
        await todoController.regitrarUsuario(req,res);
    } catch (error) {
        console.log(error)
        res.status(500).json({ok:false, message:error.message})
    }
})

router.post("/login",reportQuery,verifyToken, async(req,res)=>{
    
    try {
        await todoController.loginUsuarios(req,res)
    } catch (error) {
        console.log(error)
        res.status(500).json({ok:false, message:error.message})
    }
});

export default router;

