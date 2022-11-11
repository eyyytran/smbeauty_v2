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
    imageURL1: String,
    imageURL2: String,
    imageURL3: String,
    ingredients: String,
    usageInstructions: String,
})

const ProductList = mongoose.model('ProductList', productSchema)

export default ProductList
