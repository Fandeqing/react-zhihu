const express = require("express");
const homeRouter = require('./home')
const recommendRouter = require("./recommend")
const questionRouter = require("./question")
const followRouter = require("./follow")
const hotRouter = require("./hot")
const zvideoRouter = require("./zvideo")
const commentsRouter = require("./comments")

const router = express.Router()

router.use(homeRouter)
router.use(recommendRouter)
router.use(questionRouter)
router.use(followRouter)
router.use(hotRouter)
router.use(zvideoRouter)
router.use(commentsRouter)

module.exports = router;
