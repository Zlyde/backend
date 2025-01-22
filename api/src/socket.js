const { Server } = require('socket.io')

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE']
    },
  })

  const roomIds = []

  io.on('connection', (socket) => {
    // console.log('Client connected:', socket.id)

    socket.on('join-trip-room', (trip_id) => {
      const roomName = `${trip_id}`;
      socket.join(roomName)
      // console.log(`${socket.id} joined room ${roomName}`)
      
      if (!roomIds.includes(roomName)) {
        roomIds.push(roomName);
      }

      io.emit('IDs-forAdmin', (roomIds))
    })

    socket.on('join-all-rooms', () => {
      roomIds.forEach((roomId) => {
        socket.join(roomId)
        // console.log(roomIds)
      })
    })

    socket.on('update-position', (trip)=> {
      const { bike, trip_id } = trip
      // io.emit('position-updated', data)
      io.to(`${trip_id}`).emit('position-updated', (trip))
      // console.log(bike)
      
      io.emit('admin-trip-update', trip);
    })

    socket.on('bike-update', (bike)=> {
      io.emit('update-bike', (bike));
    })

    socket.on('disconnect', () => {
      // console.log('Client disconnected:', socket.id)
    })
  })

  return io
}

module.exports = initSocket
