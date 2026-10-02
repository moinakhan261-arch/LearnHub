const dns = require("dns")

dns.setServers(["8.8.8.8", "1.1.1.1"])

const express = require("express")
const cors = require("cors")
require("dotenv").config()
console.log("JWT_SECRET loaded:", !!process.env.JWT_SECRET)
const mongoose = require("mongoose")
const authRoutes = require("./routes/authRoutes")
const enrollmentRoutes = require("./routes/enrollmentRoutes")
const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/enrollments", enrollmentRoutes)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected")
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message)
  })

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`)
})