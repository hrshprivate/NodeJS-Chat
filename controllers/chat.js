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
      res.writeHead(200, {
        Connection: 'keep-alive',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
      })
      emitter.on('newMessage', (message) => {
        res.write(`data: ${JSON.stringify(message)} \n\n`)
      })
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new Chat()
