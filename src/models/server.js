import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server as io } from 'socket.io'
import { socketController } from '../sockets/controller.js'

export default class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.server = createServer(this.app)
    this.io = new io(this.server)

    this.paths = {}

    //Middlewares
    this.middlewares()
    //Routes
    this.routes()
    //Sockets
    this.sockets()
  }

  middlewares() {
    //CORS
    this.app.use(cors())
    //read and parse body
    this.app.use(express.json())
    //public folder
    this.app.use(express.static('src/public'))
  }

  routes() {
    // this.app.use(this.paths.users, userRouter)
  }

  sockets() {
    this.io.on('connection', socketController)
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Example websocket app listening on port ${this.port}`)
    })
  }
}
