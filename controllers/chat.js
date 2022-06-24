const events = require('events')

const MessageModel = require('../models/message')
const emitter = new events.EventEmitter()

class Chat {
  async post_messages(req, res, next) {
    try {
      const data = req.body
      if (data) {
        const mess = await MessageModel.create({
          user: data.user,
          message: data.message,
        })
      }
      console.log(data.user)
      emitter.emit('newMessage', data)
      res.status(200).json(data)
    } catch (e) {
      next(e)
    }
  }

  async get_messages(req, res, next) {
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
