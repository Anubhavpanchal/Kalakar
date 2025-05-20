import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import orderRouter from './routes/orderRoute.js';
import artistRouter from "./routes/artistRoute.js";

//app config
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middleware
app.use(express.json());

app.use(cors({
  origin: '*', // Allow all origins (for development)
  credentials: true,
}));
// ...existing code...

// api endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/orders', orderRouter);
app.use("/api/artists", artistRouter);

app.get('/', (req, res) => {
  res.send('api working ji!');
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));