const express = require("express")
const fs = require("fs")

const app = express()
app.use(express.json())
app.use(express.static("public"))

let notes = []

// GET
app.get("/notes", (req, res) => {
    res.json(notes)
})

// POST
app.post("/notes", (req, res) => {
    notes.push(req.body)
    res.json({ message: "Saved" })
})

app.listen(3000, '0.0.0.0', () => {
    console.log("Server running on port 3000")
})