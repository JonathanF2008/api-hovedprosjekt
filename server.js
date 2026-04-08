// server.js
const express = require("express")
const fs = require("fs")

const app = express()
app.use(express.json())
app.use(express.static("public"))

// Filnavn
const NOTES_FILE = "data.json"
const TODO_FILE = "todo.json"

// =====================
// Notater
// =====================
let notes = []
if (fs.existsSync(NOTES_FILE)) {
    notes = JSON.parse(fs.readFileSync(NOTES_FILE))
}

// GET alle notater
app.get("/notes", (req, res) => {
    res.json(notes)
})


app.post("/notes", (req, res) => {
    notes.push({
        title: req.body.title,
        content: req.body.content
    })
    fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2))
    res.json({ message: "Notat lagret" })
})


let todos = []
if (fs.existsSync(TODO_FILE)) {
    todos = JSON.parse(fs.readFileSync(TODO_FILE))
}


app.get("/todos", (req, res) => {
    res.json(todos)
})


app.post("/todos", (req, res) => {
    todos.push({ task: req.body.task, done: false })
    fs.writeFileSync(TODO_FILE, JSON.stringify(todos, null, 2))
    res.json({ message: "Todo lagt til" })
})


app.put("/todos/:index", (req, res) => {
    const i = parseInt(req.params.index)

    if (todos[i]) {
        todos[i].done = req.body.done   // ✅ bruker verdien fra frontend
        fs.writeFileSync(TODO_FILE, JSON.stringify(todos, null, 2))
        res.json({ message: "Todo oppdatert" })
    } else {
        res.status(404).json({ message: "Todo ikke funnet" })
    }
})


app.listen(3000, '0.0.0.0', () => {
    console.log("Server running on port 3000")
})