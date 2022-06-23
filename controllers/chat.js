const events = require('events')

const emitter = new events.EventEmitter()

class Chat {
  post_messages(req, res, next) {
    try {
      const message = req.body
      emitter.emit('newMessage', message)
      res.status(200).json(message)
    } catch (e) {
      next(e)
    }
  }

  get_messages(req, res, next) {
    try {
      emitter.once('newMessage', (message) => {
        res.json(message)
      })
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new Chat()
