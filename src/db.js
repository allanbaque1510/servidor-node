import mongoose from "mongoose";

export const connectDB = async() =>{
    const credenciales = {
        user:"allan",
        password:"allan",
        ip:"192.168.100.82",
        puerto:"27017"
    } 
    const DB = `mongodb://${credenciales.user}:${credenciales.password}@${credenciales.ip}:${credenciales.puerto}`
    try {
        await mongoose.connect(DB)
        console.log(">>>>DB is connected")
    } catch (error) {
        console.log(error)    
    }
}


