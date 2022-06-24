const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto.js");

//UPDATE

router.put("/:id", async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        //checck if there is  a password
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.SECRET_KEY
            ).toString();
        }

        try {
            
        }
        catch (err) {
            
        }
    }
});

//DELETE
//GET
//GET ALL
//GET USER STATS