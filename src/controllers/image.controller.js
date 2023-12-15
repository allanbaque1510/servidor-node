import User from "../models/user.model.js";
import Imagen from "../models/image.model.js";


export const getAllImages = async(req,res)=>{
    const datos = await Imagen.find()
    res.json(datos)
}

export const viewImage = async(req,res)=>{
    console.log("hola")
    const data = await Imagen.findOne({_id:req.params.id})
    if(!data) return res.status(400).json({message:'No se encontro imagen'})
    res.json(data)     
}

export const uploadImages = async(req,res)=>{
    const {imagen,titulo,usuario }=req.body

    try {
        const userFound = await User.findOne({username:usuario})
        if(!userFound) return res.status(400).json(['El usuario no se encuentra registrado'])
      
        const newImage = new Imagen({
            imagen,
            titulo,
            usuario,
        })

        const imageSaved = await newImage.save()
      
        res.json({
            imageSaved
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
   
};