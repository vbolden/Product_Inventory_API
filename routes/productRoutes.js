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

        res.json(product);

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// UPDATE
productRouter.put("/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedProduct);

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// DELETE
productRouter.delete("/:id", async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// READ ALL 
productRouter.get("/", async (req, res) => {
    try {
        const {
            category,
            minPrice,
            maxPrice,
            sortBy,
            page = 1,
            limit = 10,
        } = req.query;

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})