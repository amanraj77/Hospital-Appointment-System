const socketIo = require('socket.io')

let io

const initSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: '*', // You can replace '*' with your allowed frontend URL(s) for security
      methods: ['GET', 'POST'],
      credentials: true,
    },
  })

  io.on('connection', (socket) => {
    console.info('New client connected')

    socket.on('sendMessage', (message) => {
      io.emit('receiveMessage', message)
    })

    socket.on('disconnect', () => {
      console.info('Client disconnected')
    })
  })

  return io
}

const getSocketIo = () => {
  if (!io) {
    throw new Error('Socket.io not initialized')
  }
  return io
}

module.exports = {
  initSocket,
  getSocketIo,
}
