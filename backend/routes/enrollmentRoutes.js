const express = require("express")
const Enrollment = require("../models/Enrollment")
const authMiddleware = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { courseId } = req.body

    const existingEnrollment = await Enrollment.findOne({
      user: req.user.userId,
      courseId
    })

    if (existingEnrollment) {
      return res.status(400).json({
        message: "Already enrolled in this course"
      })
    }

    const enrollment = await Enrollment.create({
      user: req.user.userId,
      courseId
    })

    res.status(201).json({
      message: "Course enrolled successfully",
      enrollment
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Server error"
    })
  }
})


router.get("/", authMiddleware, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      user: req.user.userId
    })

    res.json({
      enrollments
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Server error"
    })
  }
})

module.exports = router

