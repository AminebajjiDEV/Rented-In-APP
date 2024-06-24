const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const cors = require("cors")
const app = express()


const authentificationRoutes = require("./routes/auth.js")
const listingRoutes = require("./routes/listing.js")

app.use(cors())
app.use(express.json())
app.use(express.static("public"))

/* ROUTES */
 app.use("/auth", authentificationRoutes)
app.use("/listings", listingRoutes)


/* MONGOOSE SETUP */
const port = 3001;
mongoose.connect(process.env.MONGO_URL, {
    dbName: "Rented-In",
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        app.listen(port, () => console.log(`Server is running on ${port}`));
    })
    .catch((err) => console.log(`${err} did not connect`));