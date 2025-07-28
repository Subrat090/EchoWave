import { Send } from 'lucide-react';
import { data } from 'react-router-dom';
import socket from 'socket.io-client' 

let socketInstance = null;

export const initializeSocket = (projectId) =>{
    socketInstance = socket(import.meta.env.VITE_API_URL,{

        auth:{
            token : localStorage.getItem('token')
        },
        query:{
            projectId
        }
    })
    return socketInstance;
}

 export const receiveMessage = (eventName,cb)=>{
    socketInstance.on(eventName,cb);
 }
 export const sendMessage = (eventName,data) =>{
    socketInstance.emit(eventName,data);
 }