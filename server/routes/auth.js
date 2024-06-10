const router = require("express").Router()
const bcrypt = require("bcryptjs") // for password encryption
const jwt = require("jsonwebtoken")
const multer = require("multer")

const USER = require("../models/user.js")

/* CONFIGURING MULTER FOR UPLOADED FILES STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/")// UPLOADED FILES ARE STORED IN "uploads" FOLDER
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // USE THE ORIGINAL FILE NAME
    }
})

const upload = multer({ storage });

/* USER REGISTER */

router.post("/register", upload.single("profilePicture"), async (req, res) => {
    try {
        /* COllECT ALL INFORMATION FROM THE REGISTER FORM  */
        const { lastName, firstName, email, phoneNumber, password } = req.body

        /* THE UPLOADED FILE IS AVAILABLE AS req.file */
        const profilePicture = req.file
        if (!profilePicture) {
            return res.status(400).send("NO FILE UPLOADED!")
        }

        /* PATH TO THE UPLOADED PROFILE IMAGE */

        const profilePicturePath = profilePicture.path

        /* TO CHECK IF THE USER ALREADY EXISTS */
        const existingUser = await USER.findOne({ email, phoneNumber })
        if (existingUser) {
            return res.status(400).json({ message: "USER ALREADY EXISTS!" })
        }

        /*HASH THE USERS PASSWORD FOR PASS ENCRYPTION USING "bcrypt" and "salt" */
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        /* TO CREATE NEW USER */
        const newUser = new USER({
            lastName,
            firstName,
            email,
            phoneNumber,
            password: hashedPassword,
            profilePicturePath,
        });

        /* TO SAVE THE NEW USER */
        await newUser.save()

        /* INFORMING THE USER THAT HIS ACCOUNT HAS BEEN SUCCEFULLY REGISTERED */
        res.status(200).json({ message: "User Registered Successfully!", user: newUser })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "registration failde!", error: err.message })

    }
});

module.exports = router   // TO FIX THE ".Router()" ERR & EXPORT THE FILE TO 'index.js'