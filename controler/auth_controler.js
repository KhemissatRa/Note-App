const express = require('express');
const Register = require("../model/Register_model");
const joi = require('joi');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const { jwtPrivateKey } = require('../config/custom-enviroment-variables.json');
const UserAuth = async (req, res) => {
  const schemaauth = joi.object({
    email: joi.string().min(3).max(50).required().email(),
    password: joi.string().min(6).max(100).required()
  });

  try {
    // Validate user input
    const { error } = schemaauth.validate(req.body);
    if (error) {
      console.log("❌ Validation failed:", error.details[0].message);
      return res.status(400).json({ message: "Invalid email or password format" });
    }

    // Check if user exists in the database
    const user = await Register.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare provided password with stored hash
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const name=user.name
    const token = user.generateAuthToken(); 
    res.send({ message: "Authentication successful",name, token });
    
    

  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({ message: error.message });
  }
}


module.exports = { UserAuth };
