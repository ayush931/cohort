const express = require("express")
const app = express()

app.use(express.json())

const users = []

// should return a random string

function generateToken () {
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

    let token = ""
    for (let i = 0; i < 32; i++) {
        token += options[Math.floor(Math.random() * options.length)]
    }
    return token
}

app.post("/signup", function (req, res) {
    const username = req.body.username
    const password = req.body.password

    if (users.find(u => u.username === username)) {
        res.json({
            message: "You have already signed in"
        })
        return
    }

    users.push({
        username: username,
        password: password
    })

    res.json({
        message: "You have signed up"
    })

    console.log(users)
})

app.post("/signin", function (req, res) {
    const username = req.body.username
    const password = req.body.password

    const foundUser = users.find(function (u) {
        if (u.username == username && u.password == password) {
            return true
        }
        else {
            return false
        }
    })

    if (foundUser) {
        const token = generateToken()
        foundUser.token = token
        res.json({
            token: token
        })
    }
    else {
        res.status(403).json({
            message: "Invalid username or password"
        })
    }
    console.log(users)
})

app.get("/me", function (req, res) {
    const token = req.headers.token
    let foundUser = null

    for (let i = 0; i < users.length; i++) {
        if (users[i].token == token) {
            foundUser = users[i]
        }
    }

    if (foundUser) {
        res.json({
            username: foundUser.username,
            password: foundUser.password
        })
    }
    else {
        res.json({
            message: "Invalid token"
        })
    }
}) 

app.listen(3000, () => {
    console.log("App is listening on 3000")
})