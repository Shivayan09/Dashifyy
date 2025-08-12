import express from 'express'
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoute.js';
import cors from 'cors';
import subjectRouter from './routes/subjectRoutes.js';
import routineRouter from './routes/routineRoutes.js';
import taskRouter from './routes/taskRoutes.js';
import ytLinkRouter from './routes/ytLinkRoutes.js';

const app = express()

const port = process.env.PORT || 4000

connectDB()

const allowedOrigins = [
  'http://localhost:5173',
  'https://dashify-frontend-rk1l.onrender.com',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("Hello")
})

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/subject', subjectRouter)
app.use('/api/routine', routineRouter)
app.use('/api/task', taskRouter)
app.use('/api/subjects/:subjectId/ytLinks', ytLinkRouter)

app.listen(port, () => {
    console.log("App running on port", port)
})