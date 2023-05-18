import  Express  from "express";
import mongoose from "mongoose";
import productModel from "../models/product.model"


export const getProducts = async (req:Express.Request, res:Express.Response):Promise<Express.Response> => {

    try {
        
        const result = await productModel.find() //los productos existentes
        return res.status(200).json({result})

    } catch (error) {
        return res.status(400).json({msg: "Ha ocurrido un error", error})
    }
}
export const getProduct = async (req:Express.Request, res:Express.Response):Promise<Express.Response> => {

    try {
        const usernameToSearch = req.params.name;
        const result = await productModel.find({name: {$eq: `${usernameToSearch}`}}) //busca si existe el usuario
        return res.status(200).json({result})

    } catch (error) {
        return res.status(400).json({msg: "Ha ocurrido un error", error})
    }
}

export const createProduct = async (req: Express.Request,res: Express.Response):Promise<Express.Response> => {
    
    try {
        let newProduct = req.body;
        
        // creando el documento
        const userCreated = await productModel.create(newProduct)
        if(userCreated) return res.status(201).json({msg: "Producto Creado"})
        throw {msg: "Error al crear el producto"}

    } catch (error) {
        return res.status(400).json({msg: "Ha ocurrido un error", error})
    }
}

export const updateProduct = async (req:Express.Request, res:Express.Response):Promise<Express.Response> =>{

    // Estructura de lo que va a mandar el backend a la base de datos
    // {
    //     _id:
    //     datToUpdate:{}
    // }
    try {
        let {dataToUpdate, _id} = req.body
        const updateData = await productModel.findByIdAndUpdate(_id, dataToUpdate)
        return res.status(200).json({msg: "Producto Actualizado !!!"})

    } catch (error) {
        return res.status(400).json({msg: "Ha ocurrido un error", error})
    }
}
export const deleteProduct = async (req:Express.Request, res:Express.Response):Promise<Express.Response> =>{

    // Estructura de lo que va a mandar el backend a la base de datos
    // {
    //     _id:
    //     datToUpdate:{}
    // }
    try {
        let _id = req.params.id
        const dataToDelete = await productModel.find({_id: {$eq: `${_id}`}})
        if(!(dataToDelete.length>0)) return res.status(400).json({msg: `Error no se ha encontrado el objeto`})
        const deleteData = await productModel.deleteOne({_id: {$eq: `${_id}`}})
        return res.status(200).json({product: `${dataToDelete}`, msg: "El producto anterior ha sido eliminado de la DB !!!"})

    } catch (error) {
        return res.status(400).json({msg: "Ha ocurrido un error", error})
    }
}