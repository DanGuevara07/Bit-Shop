import  Express  from "express";
import mongoose from "mongoose";
import userModel from "../models/user.model"


export const getUsers = async (req:Express.Request, res:Express.Response):Promise<Express.Response> => {

    try {
        
        const result = await userModel.find() //los usuarios existentes
        return res.status(200).json({result})

    } catch (error) {
        return res.status(400).json({msg: "Ha ocurrido un error", error})
    }
}
export const getUser = async (req:Express.Request, res:Express.Response):Promise<Express.Response> => {

    try {
        const usernameToSearch = req.params.username;
        const result = await userModel.find({username: {$eq: `${usernameToSearch}`}}) //busca si existe el usuario
        return res.status(200).json({result})

    } catch (error) {
        return res.status(400).json({msg: "Ha ocurrido un error", error})
    }
}

export const createUser = async (req: Express.Request,res: Express.Response):Promise<Express.Response> => {
    
    try {
        let newUser = req.body;
        const currentTime:Date = new Date();
        const minTime:Date = new Date('01/01/1990')
        const receivedTime:Date = new Date(newUser.dateBirth)
        // Validación de Fecha y de Edad
        if(!isFinite(+receivedTime)){
            return res.status(400).json({msg: `Ha ingresado una fecha invalida el formato es MM/DD/YYYY o YYYY/MM/DD`})
        }
        if(receivedTime>currentTime || receivedTime<minTime){
            return res.status(400).json({msg: "Fecha fuera de rango ingrese fechas despues de 1990 hasta este momento"})
        }
        const age = currentTime.getFullYear() - receivedTime.getFullYear()
        if(age < 18){
            return res.status(400).json({msg: `No se puede registrar al usuario porque es menor de edad`})
        }
        if(age === 18) {
            if (currentTime.getMonth()>receivedTime.getMonth()) return res.status(400).json({msg: `No se puede registrar al usuario porque es menor de edad`})
            if (currentTime.getDate()< receivedTime.getDate() && currentTime.getMonth() === receivedTime.getMonth()) return res.status(400).json({msg: `No se puede registrar al usuario porque es menor de edad`})
        }
        // validación de usuario ya existente
        const checkUsername = await userModel.find({username: {$eq: `${newUser.username}`}})
        if(checkUsername.length>0) return res.status(400).json({msg: `Error el nombre de usuario ${newUser.username} ya está en uso`})
        //validacion de email ya existente
        const checkEmail = await userModel.find({email: {$eq: `${newUser.email}`}})
        if(checkEmail.length>0) return res.status(400).json({msg: `Error el email ${newUser.email} ya está en uso`})
        
        // creando el registro

        const userCreated = await userModel.create(newUser)
        if(userCreated) return res.status(201).json({msg: "Usuario Creado"})
        throw {msg: "Error al crear un usuario"}

    } catch (error) {
        return res.status(400).json({msg: "Ha ocurrido un error", error})
    }
}

export const updateUser = async (req:Express.Request, res:Express.Response):Promise<Express.Response> =>{

    // Estructura de lo que va a mandar el backend a la base de datos
    // {
    //     _id:
    //     datToUpdate:{}
    // }
    try {
        let {dataToUpdate, _id} = req.body
        const updateData = await userModel.findByIdAndUpdate(_id, dataToUpdate)
        return res.status(200).json({msg: "Usuario Actualizado !!!"})

    } catch (error) {
        return res.status(400).json({msg: "Ha ocurrido un error", error})
    }
}