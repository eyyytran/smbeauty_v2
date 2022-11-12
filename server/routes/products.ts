import { Router } from 'express'
import Product from '../models/product'

interface IProduct {
    name: string
    price: number
    type: string
    quantityAvailable: number
    quantityPurchased: number
    activeIngredients: string
    description: string
    subtitle: string
    imageUrls: string[]
    ingredients: string
    usageInstructions: string
}

const productsRouter = Router()

productsRouter.post('/create', async (req, res) => {
    if (Object.keys(req.body).length !== 11) return res.sendStatus(400)

    const product = new Product({ ...req.body })
    const savedProduct = await product.save()

    if (savedProduct) {
        res.sendStatus(200)
    } else {
        res.sendStatus(400)
    }
})

productsRouter.get('/get_all_inventory', async (req, res) => {
    const totalInventory = await Product.find({})
    if (totalInventory) {
        res.send(totalInventory)
    } else {
        res.sendStatus(500)
    }
})

export default productsRouter
