const express = require("express");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobileNumber:{type:Number,required:true},
    aadharNumber:{type:Number,required:true},

})

const UserModel = mongoose.model("info",UserSchema)
module.exports= UserModel;