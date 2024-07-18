const express = require('express')
const router = express.Router()
const {addToCart,addNew, lessOne,deleteCart,getCartItems,clearCart } = require("../controller/cart");
router.post("/addToCart", addToCart);
router.get("/", getCartItems);
router.put("/add/:id", addNew);
router.put("/minus/:id", lessOne);
router.delete("/:id" ,deleteCart);
router.delete("/" ,clearCart);
module.exports = router
