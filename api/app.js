import express from 'express'

const app = express()

app.get("/",(req,res)=>{
    res.send("api - v1")
})

export default app;