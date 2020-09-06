
const controller = {}

controller.home = require('./home')
controller.recommend = require('./recommend')
controller.question = require('./question')
controller.follow = require('./follow')
controller.hot = require('./hot')
controller.zvideo = require('./zvideo')
controller.comments = require('./comments')

module.exports = controller;