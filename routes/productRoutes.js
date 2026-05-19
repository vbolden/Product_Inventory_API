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

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

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

        if(!updatedProduct) {
            return res.status(404).json({error: "Product not found"})
        }

        res.json(updatedProduct);

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// DELETE
productRouter.delete("/:id", async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if(!deletedProduct) {
            return res.status(404).json({error: "Product not found"})
        }

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

        let filter = {};

        // CATEGORY FILTER
        if (category) {
            filter.category = category;
        }

        // PRICE FILTERS
        if (minPrice || maxPrice) {

            filter.price = {};

            if (minPrice) {
                filter.price$gte = Number(minPrice);
            }

            if (maxPrice) {
                filter.price$lte = Number(maxPrice);
            }
        }

        // SORTING
        let sort = {};

        if (sortBy === "price_asc") {
            sort.price = 1;
        } else if (sortBy === "price_desc") {
            sort.price = -1;
        }

        // PAGINATION
        const skip = (Number(page) - 1) * Number(limit);

        const products = await Product.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(Number(limit));

        res.json(products);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});