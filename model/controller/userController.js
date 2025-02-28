//const tokengenerated = require('../jwtToken/jwt')
const userModel = require('../model/userModel.js')
const bcrypt = require('bcryptjs')
const { jwtSecret } = require('../config/jwtConfig');
const KYCModel = require('../model/KYCModel')
const postModel = require('../model/postModel')
const express = require('express');

//Create a user
exports.createUser = async (req, res) => {
    const { username, gmail, password } = req.body
    if (!username || !gmail || !password) {
        return res.json({ mmessage: 'Enter all input fields to continue!' }).status(404)
    }
    try {
        const user = await userModel.findOne({ gmail })
        //Check if user exist
        if (user) {
            return res.json({ message: 'User already exist'}).status(404)
        }
        //Hash the password
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashPassword(password, salt)
        //Create new User
        const newUser = new userModel({ ...req.body, password: hashPassword, profile:[] })

        const userSaved = await newUser.save()

        const{password:_, otheruserDetails} = userSaved.toObject()
        res.json(otheruserDetails).status(200)
 
    } catch (error) {
        console.log(error)
    }
}
const profileUpdate = async (req,res)=> {
    const tokenId = req.user.id
    const reqId = req.params.id
    const {country, phoneNumber, street, bio} = req.body
    if(tokenId === reqId){
        try {
            await userModel.findByIdAndUpdate(tokenId, {
                $set:{
                    "profile.country": country,
                    "profile.phoneNumber": phoneNumber,
                    "profile.street": street,
                    "profile.bio": bio,
                }
            }, {new: true})
            
        } catch (error) {
            console.log(error)
        }
        }
        else {
            console.log("access denied")
        }
    }

 const userLogin = async (req, res) => {
    const { gmail, password } = req.body
    if ( !gmail || !password) {
        return res.json({ mmessage: 'Enter all input fields to continue!' }).status(404)
    }
    try {
        const user = await userModel.findOne({ gmail })
        if (!user) {
            return res.json({ message: 'No existing user found!' })
        }
        const comparePass = await bcrypt.compare(password, user.password)
        if (!comparePass) {
            res.json({ message: 'Gmail or password Incorrect' }).status(404)
        }
        const token = tokengenerated(user._id)
        const { password: _, ...userData } = user.toObject()
        res.cookie('token', token, { httpOnly: true, sameSite: 'strict' }).status(200).json(otheruserDetails)
    } catch (error) {
        console.log(error)
    }
}

//Delete user

const deleteUser = async (req, res) => {
    
        const paramId = req.params.id
        const tokenId = req.user.id

        if(tokenId===paramId){
            try{
            
                
                await Promise.all([
                    KYCModel.findOneAndDelete({user: tokenId}),
                    postModel.deleteMany({author: tokenId}),
                    userModel.findByIdAndDelete(paramId)
                ])
                res.json({Message: 'User deleted succesfully!'}).status(200)

            }
            catch(error){
                rse.status(500).json({error: error.message})
            }
        
    } else{
        return res.json({mess: 'Access denied'}).status(404)
    }
}
