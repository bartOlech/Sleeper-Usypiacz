const mongoose = require('mongoose');
const UserData = require('../../models/usersDB');
const jwt = require('jsonwebtoken');

module.exports.getFavourite = (req, res) => {
    const { social, registerUser } = req.cookies;

    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true
    })

    // Get a favourite sounds from the database
    UserData.findOne({})

    if (social === 'facebook' || social === 'google') {

        const userJWT = req.cookies.auth;
        const userJWTPayload = jwt.verify(userJWT, 'my-secret');

        UserData.findOne({
            _id: userJWTPayload.id
        }).then(data => {
            res.status(200).json({
                favouriteSounds: data.favourite,
                favouriteSoundsPl: data.favouritePl
            })
        })
    } else {
        UserData.findOne({
            email: registerUser
        }).then(data => {
            res.status(200).json({
                favouriteSounds: data.favourite,
                favouriteSoundsPl: data.favouritePl
            })
        })
    }
}