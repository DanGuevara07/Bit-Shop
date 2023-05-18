import mongoose, { Schema } from "mongoose";

//schema de la colección

const User = new Schema({
    id: {type: String, required:true},
    name: {type: String, required:true},
    lastName: {type: String, required:true},
    email: {type: String, required:true},
    username: {type: String, required:true},
    password: {type: String, required:true},
    role: {type: String, required:true},
    active: {type: Boolean, default:false},
    dateBirth: {type: String, required: true},
    address: {type: String, required:true},
    paymentMethods: {type: Array, default:[]},
    phoneNumber: {type: String, required:true},
}, {
    timestamps: true, // guarda los tiempos de creación, modificación
    versionKey: false // son un hash que indican la version del documento
})

export default mongoose.model("user", User)
