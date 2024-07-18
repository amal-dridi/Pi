const express = require('express')
const router = express.Router()
const {addProduct,UpdateProduct, getAllProduct,GetTunisianProduct,getbysearch, GetIndianProduct,GetMexicanProduct,GetItalienProduct,deleteProduct,getAdminProduct  } = require("../controller/product");
const { verifyToken } = require("../controller/user");

router.post("/addProduct", addProduct);
router.get("/", getAllProduct);
router.get("/admin", getAdminProduct);
router.get("/tunisien",  GetTunisianProduct);
router.get("/indian",  GetIndianProduct);
router.get("/mexican",  GetMexicanProduct);
router.get("/italian",  GetItalienProduct);
router.get("/search/:keyword",  getbysearch);
router.put("/:id", UpdateProduct);
router.delete("/delete/:id" ,deleteProduct);
module.exports = router