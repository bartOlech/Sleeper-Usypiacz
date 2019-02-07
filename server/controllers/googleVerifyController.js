const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const UserData = require('../models/usersDB');
const request = require('request');
const jwtDecode = require('jwt-decode');
const config = require('../config/config')
const { OAuth2Client } = require('google-auth-library');


module.exports.verify = (req, res, next) => {

    const userJWT = req.cookies.auth;
    const decodedToken = jwtDecode(userJWT)

    //If token is expired, renew it(sign out)
    console.log('ZACZYNAM ANALIZOWAĆ')

    if (!userJWT) {
        //hide user component, show sign up component
        res.send(401, 'Invalid or missing authorization token')
    } else {
        jwt.verify(req.cookies.auth, 'my-secret', function (err, decoded) {
            if (err) {
                //hide user component, show sign up component
                const decodedToken = jwtDecode(userJWT)
                mongoose.connect('mongodb://localhost:27017/noiseApp-users', { useNewUrlParser: true });
                mongoose.Promise = global.Promise;
                UserData.find({ _id: decodedToken }).then((user) => {
                    UserData.deleteOne({ _id: user[0]._id }, (err) => {
                        if (err) {
                            console.log(err)
                        }
                        mongoose.connection.close();
                    })
                })

                res.clearCookie('auth')
                return res.status(401).json({ err: 'token is expired' });
            } else {
                const userJWTPayload = jwt.verify(req.cookies.auth, 'my-secret');
                if (!userJWTPayload) {
                    res.clearCookie('auth')
                    res.status(401).json({ tokenStatus: "Token is wrong" });
                } else {
                    mongoose.connect('mongodb://localhost:27017/noiseApp-users', { useNewUrlParser: true });
                    mongoose.Promise = global.Promise;

                    UserData.findOne({ _id: userJWTPayload.id }).then((user) => {

                        //tutaj uwierzytelnianie
                        console.log('!!!!!')
                        const client = new OAuth2Client(config.googleAuth.clientID);
                        async function verify() {
                            const ticket = await client.verifyIdToken({
                                idToken: user.googleTokenId,
                                audience: config.googleAuth.clientID,
                            });
                            const payload = ticket.getPayload();
                            console.log(payload.name)
                            const userid = payload['sub'];
                            mongoose.connection.close();
                            res.status(200).json({ fullName: payload.name });
                        }
                        verify().catch(console.error);
                        

                    })
                }
            }
        });


    }
}