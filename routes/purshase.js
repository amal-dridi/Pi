const express = require('express')
const router = express.Router()
const {buyProducts, getAll,deletePurchase } = require("../controller/purshase");
router.post("/", buyProducts);
router.get("/get", getAll);
router.delete("/delete/:id" ,deletePurchase);
module.exports = router