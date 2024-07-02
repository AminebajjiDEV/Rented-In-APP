const router = require("express").Router()

const booking = require("../models/booking")

/* GET THE USER'S TRIP LIST */
router.get("/:userId/trips", async (req, res) => {
    try {
        const { userId } = req.params
        const trips = await booking.find({ customerId: userId }).populate("customerId hostId listingId")
        res.status(202).json(trips)
    } catch (err) {
        res.status(404).json({ message: "Can not find trips!", error: err.message })
    }
})

module.exports = router