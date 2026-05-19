const productRouter = require('express').Router();
const Product = require("../models/Product");

// CREATE
productRouter.post("/", async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);

        res.status(201).json(newProduct);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// READ SINGLE PRODUCT
productRouter.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        res.json(product)

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
})

// UPDATE

// DELETE

// READ ALL 