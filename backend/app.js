
import express from 'express';
import morgan from 'morgan';
import connect from './db/db.js';
import userRoutes from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import projectRoutes from './routes/project.route.js';
import cors from 'cors'
connect();

const app =express();
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(cookieParser());
app.get('/',(req,res)=>{
    res.send('hello world');
});
app.use('/users', userRoutes);
app.use('/project',projectRoutes);

export default app;