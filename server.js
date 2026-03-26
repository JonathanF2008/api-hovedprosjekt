const express = require("express")
const fs = require("fs")

const app = express()
app.use(express.json())
app.use(express.static("public"))

const FILE = "data.json"


let notes = []

if (fs.existsSync(FILE)) {
    const data = fs.readFileSync(FILE)
    notes = JSON.parse(data)
}

// GET
app.get("/notes", (req, res) => {
    res.json(notes)
})

// POST
app.post("/notes", (req, res) => {
    notes.push(req.body)

    
    fs.writeFileSync(FILE, JSON.stringify(notes, null, 2))

    res.json({ message: "Saved" })
})

app.listen(3000, '0.0.0.0', () => {
    console.log("Server running on port 3000")
})