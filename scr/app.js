import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

import __dirname from "./utils.js";
import viewsRouter from './routes/views.router.js'

const app = express();
const server = app.listen(8088, () => console.log('listening on 8080'))

app.use(express.static(`${__dirname}/public`))


app.engine("handlebars", handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set("view engine", 'handlebars')


app.use(express.static(`${__dirname}/public`))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', viewsRouter)

const io = new Server(server)

const mensajes = []
io.on("connection", socket => {
    console.log("conectado")
    socket.emit('logs', mensajes)
    socket.on('mensages', data => {
        mensajes.push(data);
        io.emit('logs', mensajes)
    })
    socket.on('authenticated', data => {
        socket.broadcast.emit("newUserConnected", data)
    })
})