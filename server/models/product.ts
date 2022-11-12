import mongoose from 'mongoose'
const { Schema } = mongoose

const productSchema = new Schema({
    name: String,
    price: Number,
    type: String,
    quantityAvailable: Number,
    quantityPurchased: Number,
    activeIngredients: String,
    description: String,
    subtitle: String,
    imageUrls: [{ type: String }],
    ingredients: String,
    usageInstructions: String,
})

const Product = mongoose.model('Products', productSchema)

export default Product
