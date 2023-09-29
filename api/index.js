import express from 'express'
import cors from 'cors'
import { categoryRouter, productRouter } from './../routes/index.js'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

const app = express()

// middleware implementation
app.use(cors({origin:"*"}))
app.use(helmet());
app.use(express.json())
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);
app.use(express.static('public'))

// api entry route
app.get("/",(req,res)=>{
    res.send("api - v1")
})

// application routes
app.use("/api/product",productRouter)
app.use("/api/category",categoryRouter)

export default app;

