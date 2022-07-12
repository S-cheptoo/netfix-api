const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        //encrypt password using crypto-js
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_KEY
        ).toString()
    });

    try{
        const user = await newUser.save();
        res.status(201).json(user);
    }catch(err){
        res.status(500).json(err);
    }
});

//LOGIN
router.post("/login", async (req, res )=> {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(401).json("Wrong Password or Username!");

        //decrypt the hashed password to see if it compares to the original
        const bytes = Crypto.JS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.password &&
            res.status(401).json("Wrong Password or Username!");
        
        const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin },
            process.env.SECRET_KEY,
            { expiresIn: "5d" }
        );
        
        //desstructuring or holding other user info and leaving out the password
        const { password, ...info } = user._doc;
        
        res.status(200).json(...info, accessToken);
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;