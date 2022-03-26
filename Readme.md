# Docker and Express Example

That is a very very basic example with expressjs and Docker. For beginners starting of with Node.js Servers.
See this as an tutorial.

## 1. Node.js and using json-server
You need Node.js and npm installed on your PC. Create a new Directory and type:
`npm init`
To initialize your project. After that install the json-server package by typing into the console of your choice:
`npm install json-server`
Copy the `mocks` folder with the `db.json` into your project directory. Now add a new script to your `package.json`.
```
  "scripts": {
    "startMock": "json-server"
  },
```
And run your mock server by running `npm run startMock` and visit the localhost Address prompted in the console.

##  2. Write your Express server
Now install the express and axios package by running:
`npm install express axios`
And now add a `src` directory and an `index.js` file to your project.

Start of by adding:
```js
const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

This initializes an express server and adds a **Hello World** Route. Now you can run it by ether running `node src/index.js` or add the following script to the script section of your `package.json` and afterwards running `npm run start`:
```
"start": "node src/index.js",
```
Visiting http://localhost:8080 will prompt you with an "Hello World" message.

After that you can add some more routes to try out expressjs.
For example:

```js
...
let counter = 0
...
app.get('/addition', (req, res) => {
  const zahl1 = req.query.zahl1
  const zahl2 = req.query.zahl2
  res.send(JSON.stringify(parseInt(zahl1) + parseInt(zahl2)))
})

app.get('/count', (req, res) => {
  counter++
  res.send('Aufruf: ' + counter)
})
```
After making changes you need to restart your application to have the changes applied. That can be automated by packages like nodemon.

## 3. Add a connection the the mock service
Make sure the Mock Server is running in its own shell and add the following code to your `index.js`:

```js
const axios = require('axios')
let backendMock = 'http://localhost:3000/'
...
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
```

You can test this function by for example calling http://localhost:8080/diagnosis/1

## 4. Dockerization
For this step you need Docker installed on your machine.
Create a `Dockerfile` file in your Project and add:
```Docker
FROM node:16-alpine

WORKDIR /app

COPY src /app/src
COPY node_modules /app/node_modules
COPY package.json /app

EXPOSE 8080
CMD ["npm", "run", "start"]
```

Now type `docker build . -t <somename>` into your console. By typing  `docker image` after that you can see the image you just build. Now typing `docker run -p <PORT>:8080 -d <somename>` will run the Application on the provided port.
