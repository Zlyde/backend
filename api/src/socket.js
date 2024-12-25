const { Server } = require('socket.io')

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE']
    },
  })

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id)

    socket.on('join-trip-room', (tripId) => {
      socket.join(`trip-${tripId}`)
      console.log(`${socket.id} joined room trip-${tripId}` )
    })

    socket.on('update-position', (data)=> {
      const { tripId, position } = data
      io.to(`trip-${tripId}`).emit('position-updated', { tripId, position })
      console.log(position)
    })

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id)
    })
  })

  return io
}

module.exports = initSocket