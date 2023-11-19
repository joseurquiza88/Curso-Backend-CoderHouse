import mongoose from "mongoose";

const cartsCollection = "Carts"

const cartsSchema = new mongoose.Schema({
    products : [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                quantity : Number,
            },
        },
    ],
})

cartsSchema.pre("findOne",function(next){
    this.populate("products.product")
    next()
})

const CartsModel = mongoose.model(cartsCollection,cartsSchema)

export default CartsModel





