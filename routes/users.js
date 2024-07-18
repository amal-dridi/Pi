var express = require('express');
var router = express.Router();
const { login,logout, signup} = require("../controller/user");

router.post("/login", login);
router.post("/signup", signup);
router.get("/logout",  logout);

module.exports = router;
