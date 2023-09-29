import express from 'express'
import cors from 'cors'
import { categoryRouter, productRouter } from './../routes/index.js'

const app = express()

// middleware implementation
app.use(cors({origin:"*"}))
app.use(express.json())
app.use(express.static('public'))

// api entry route
app.get("/",(req,res)=>{
    res.send("api - v1")
})

// application routes
app.use("/api/product",productRouter)
app.use("/api/category",categoryRouter)

export default app;

