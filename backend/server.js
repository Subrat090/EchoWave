import 'dotenv/config.js';
import {Server}from 'socket.io';


import http from 'http';
import app from './app.js';

const server = http.createServer(app);

const io = new Server(server);
io.on('connection', socket => {
  socket.on('event', data =>{} /* … */); 
 console.log(' a user connected ')
  socket.on('disconnect', () => { /* … */ }); 
});

const port =process.env.PORT || 3000;
server.listen(port,()=>{
   console.log(`Server is running on port ${port}`) 
})