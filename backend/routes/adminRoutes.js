const express = require("express");
const jwt = require("jsonwebtoken");
const adminModel = require("../models/adminModel");
const route = express.Router();


route.post("/login", async (req, res) => {
    const { name, password } = req.body;
    try {
        const admin = await adminModel.findOne({ name });
        console.log(admin+" "+name+" "+password)
        if (admin && password === admin.password) {
            const token = jwt.sign({ adminId: admin._id, name: admin.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.json({ message: "success", token });
        } else {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = route;
