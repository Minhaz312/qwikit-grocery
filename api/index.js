import express from 'express'

const app = express()

app.use(express.static('public'))

app.get("/",(req,res)=>{
    res.send("api - v1")
})

export default app;

