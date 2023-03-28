const express = require("express")
const path = require("path")

const app = express()
const server = require("http").createServer(app)

app.use(express.static(path.join(__dirname+"/src")));

server.listen(5000);