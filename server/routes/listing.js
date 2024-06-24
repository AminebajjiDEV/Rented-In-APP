const router = require("express").Router()
const multer = require("multer")


const listing = require("../models/listing")
const user = require("../models/user")
/* Configuring Multer for file Uploads */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/"); // to store the uploaded files in the upload folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // to use the original file name
    },
});

const upload = multer({ storage })

/* Creating Listings POST method */

router.post("/create", upload.array("listingPhotos"), async (req, res) => {
    try {
        /*collect the data from the form */
        const {
            creator,
            category,
            type,
            streetAddress,
            aptSuite,
            city,
            province,
            country,
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
            title,
            description,
            highlight,
            highlightDesc,
            price,
        } = req.body

        const listingPhotos = req.files
        if (!listingPhotos) {
            res.status(400).send("No file uploaded!")
        }
        const listingPhotoPaths = listingPhotos.map((file) => file.path)

        const newListing = new listing(
            {
                creator,
                category,
                type,
                streetAddress,
                aptSuite,
                city,
                province,
                country,
                guestCount,
                bedroomCount,
                bedCount,
                bathroomCount,
                amenities,
                listingPhotoPaths,
                title,
                description,
                highlight,
                highlightDesc,
                price,
            })

        await newListing.save()
        res.status(200).json(newListing)
    } catch (err) {
        res.status(400).json({ message: "Failed to create listing!", error: err.message })
        console.log(err)
    }
});

/* fetch listing using the GET method */

router.get("/", async (req, res) => {
    const qCategory = req.query.category
    try {
        let listings
        if (qCategory) {
            listings = await listing.find({ category: qCategory }).populate("creator")
        } else {
            listings = await listing.find()
        }
    } catch (err) {
        res.status(404).json({ message: "Fail to fetch listings", error: err.message })
        console.log(err)
    }


})

module.exports = router