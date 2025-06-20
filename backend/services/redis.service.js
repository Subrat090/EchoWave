import Redis from 'ioredis';
import { connect } from 'mongoose';

const redisClient = new Redis({
     host:process.env.REDIS_HOST,
     port:process.env.REDIS_PORT,
     password:process.env.REDIS_PASSWORD
})

redisClient.on('connect',()=>{
    console.log("Redis is connected");
})

export default redisClient;