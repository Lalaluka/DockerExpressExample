const express = require('express')
const app = express()
const port = 8080
let counter = 0

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/bye', (req, res)=>{
  res.send("ByeBye")
})

app.get('/addition', (req, res)=>{
  const zahl1 = req.query.zahl1
  const zahl2 = req.query.zahl2
  res.send(JSON.stringify(parseInt(zahl1) + parseInt(zahl2)))
})

app.get('/count', (req,res)=>{
  counter++
  res.send('Aufruf: ' + counter)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})