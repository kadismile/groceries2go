require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketIo = require('socket.io');
const cors = require('cors');
const io = socketIo(server);
const mongoose = require('mongoose');
const colors = require('colors');
const connectDb = require('./config/db');

app.use(express.json());
app.use(cors());

//connect to the database
connectDb();

//seed into the db

app.use('/', require('./routes/index'));
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/church', require('./routes/church'));
app.use('/api/v1/webhook', require('./routes/webhook'));
app.use('/api/v1/auth', require('./routes/auth'));


io.on('connection', (socket) => {
  socket.on('greet', greeting => {
    console.log(greeting.redBG)
  })
});


const port = 5000;
server.listen(port, () => console.log(`server started on port ${port}`.bgCyan));


module.exports = server;
