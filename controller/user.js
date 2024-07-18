const Models = require("./../models");
const User = Models.User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey= "AZRLXFDGDFGD3FWCSFS55523444FDVET56FGDZA";
//const jwt = require("jsonwebtoken");
require("dotenv").config();
const expressJwt = require("express-jwt");

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
  
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        return res.status(401).json({ message: 'Incorrect password' });
      }
  
      const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET);
      // save user token
      user.token = token;
    // persis the toke as 't' in cookie with expiry date
    res.cookie("t", token, { httpOnly: true });
    // return response with user and token to frontend client
      res.status(200).json({ token, userId: user.id });
    } catch (err) {
      res.status(500).json({ message: 'Login failed', error: err });
    }
}
exports.logout = (req, res) => {
  // Client-side should handle removing token
  res.clearCookie("t");
  res.status(200).json({ message: 'Logged out' });
};
exports.signup= async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = await User.create({ email, password: hashedPassword });
  
      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      res.status(500).json({ error: 'User registration failed' });
    }
  }

 
 
  exports.verifyToken = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
  
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, secretkey);
    } catch (err) {
      return res.status(500).json({ message: 'Invalid token' });
    }
  
    if (!decodedToken) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
  
    req.userId = decodedToken.userId;
    next();
  };

