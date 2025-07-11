import 'dotenv/config.js';
import {Server}from 'socket.io';
import http from 'http';
import app from './app.js';
import jwt from 'jsonwebtoken';

const server = http.createServer(app);
const port =process.env.PORT || 3000;


const io = new Server(server);
 io.use((socket,next)=>{
   try{
const token =
  socket.handshake.auth?.token ||
  socket.handshake.headers?.authorization?.split(' ')[1];
if(!token){
   return next(new Error('Authentication error'))
}

const decoded = jwt.verify(token,process.env.JWT_SECRET)
if(!decoded){
   return next(new Error('Authentication error'))
}
socket.user = decoded
next();
   }
   catch(error){
      next(error);
   }
 })
io.on('connection', socket => {
    console.log(' a user connected ');

  socket.on('event', data =>{/* … */} ); 

  socket.on('disconnect', () => { /* … */ }); 
});


server.listen(port,()=>{
   console.log(`Server is running on port ${port}`) 
})