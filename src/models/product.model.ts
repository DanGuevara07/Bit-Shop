import mongoose, {Schema} from "mongoose"

const Product = new Schema({
    name: {type: String, required:true},
    price: {type: Number, required:true},
    stock: {type: Number, default:0},
    category: {type: Array, default:[]},
    description: {type: String, default:""},
    images: {type: String, default:""},
}, {
    timestamps: true, // guarda los tiempos de creación, modificación
    versionKey: false // son un hash que indican la version del documento
})

export default mongoose.model("product", Product)