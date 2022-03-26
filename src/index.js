const express = require('express')
const axios = require('axios')
const app = express()
const port = 8080
let counter = 0
let backendMock = 'http://localhost:3000/'

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/bye', (req, res) => {
  res.send("ByeBye")
})

app.get('/addition', (req, res) => {
  const zahl1 = req.query.zahl1
  const zahl2 = req.query.zahl2
  res.send(JSON.stringify(parseInt(zahl1) + parseInt(zahl2)))
})

app.get('/count', (req, res) => {
  counter++
  res.send('Aufruf: ' + counter)
})

app.get('/diagnosis/:id', (req, res) => {
  axios.get(backendMock+req.params.id).then((e)=>{
    let diagnosisResult = "green"
    let msgs = []
    if(e.data.UAS.length > 2) {
      diagnosisResult = "red"
      msgs.push("To many UAS")
    }
    if(e.data.INITS.length > 2) {
      diagnosisResult = "red"
      msgs.push("To many INITS")
    }
    res.json({
      type: e.data.type,
      downstream: e.data.Downstream *  0.001 + " Mbit/s",
      upstream: e.data.Upstream *  0.001 + " Mbit/s",
      diagnosisResult: diagnosisResult,
      msg: msgs
    })

  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})