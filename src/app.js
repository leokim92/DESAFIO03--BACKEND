const express = require('express');
const app = express();
const ProductManager = require('./controllers/ProductManager');
const productManager = new ProductManager("./src/models/products.json");

const PORT = 8080;

app.use(express.json());

app.get("/products", async (req, res) => {
    try {
        const limit = req.query.limit;
        const products = await productManager.getProducts()
        if(limit) {
            res.json(products.slice(0, limit));
        } else {
            res.json(products)
        }
    } catch (error) {
        res.status(500).json({error: "Internal server error"})
    }
})

app.get("/products/:pid", async (req, res) => {
    try {
        let id = req.params.pid;
        const product = await productManager.getProductById(parseInt(id));

        if (!product) {
            return res.json({error: "ID not found"})
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({error: "Internal server error"})
    }
})

app.listen(PORT, () => {
    console.log(`running port ${PORT}`);
})