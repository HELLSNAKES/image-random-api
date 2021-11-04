const express = require("express")
const app = express()
const fs = require("fs")
const port = process.env.PORT || 5000
const bodyParser = require("body-parser")
const cors = require("cors")
const rateLimit = require("express-rate-limit")
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("images"))
app.use(limiter)
app.use(cors())
app.get("/api/kurumi", (req, res) => {
    res.header("Content-type: application/json; charset=UTF-8")
    const result = {}
    result.code = 200
    const imageList = fs.readdirSync("./images/")
    const randomImage = imageList[Math.floor(Math.random() * imageList.length)]
    result.url = `127.0.0.1:5000/${randomImage}`
    result.author = "HELLSNAKE , Sunglows Team"
    result.source = "https://github.com/HELLSNAKES/image-random-api"
    console.log(result)
    res.send(JSON.stringify(result))
})

app.listen(port, "0.0.0.0", function () {
    console.log(`Server listening on port ${port}\n`)
})
