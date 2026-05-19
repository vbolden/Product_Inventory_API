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

// UPDATE

// DELETE

// READ ALL 