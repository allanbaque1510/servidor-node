import express from "express";
import morgan from "morgan";
import authRoutes from './routes/auth.routes.js'
import imageRoutes from './routes/image.routes.js'
import cors from 'cors'
import cookieParser from "cookie-parser";
const app = express();
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api',authRoutes);
app.use('/api',imageRoutes);
export default app;