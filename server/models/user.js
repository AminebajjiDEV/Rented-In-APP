/* User Schema is the Data structure for every USER when they register all the DATA inputed in the form will be collected and stored */

const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        lastName: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePicturePath: {
            type: String,
            default: "",
        },
        tripList: {
            type: Array,
            default: [],
        },
        wishList: {
            type: Array,
            default: [],
        },
        propertyList: {
            type: Array,
            default: [],
        },
        reservationList: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true } //TO LET YOU KNOW THE EXAT TIME WHEN A NEW USER REGISTERED & IT WILL BE DISPLAYED IN YOUR OWN MONGO-DB PROJECT DASHBOARD

)

const user = mongoose.model("USER", userSchema)

module.exports = user