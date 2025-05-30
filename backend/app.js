
import express from 'express';
import morgan from 'morgan';
import connect from './db/db.js';
import userRoutes from './routes/user.route.js';
import cookieParser from 'cookie-parser';
connect();
const app =express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(cookieParser());
app.get('/',(req,res)=>{
    res.send('hello world');
});
app.use('/users', userRoutes);

export default app;