const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("public"))
