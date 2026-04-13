
const express = require("express")
const fs = require("fs")

const app = express()
app.use(express.json())
app.use(express.static("public"))


const NOTES_FILE = "data.json"
const TODO_FILE = "todo.json"


let notes = []
if (fs.existsSync(NOTES_FILE)) {
    notes = JSON.parse(fs.readFileSync(NOTES_FILE))
}


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
    todos = JSON.parse(fs.readFileSync(TODO_FILE, "utf-8"))
}

app.get("/todos", (req, res) => {
    try {
        const data = fs.readFileSync(TODO_FILE)
        const todos = JSON.parse(data)
        res.json(todos)
    } catch {
        res.json([])
    }
})


app.post("/todos", (req, res) => {
    console.log("BODY:", req.body) // 👈 viktig

    let todos = []
    if (fs.existsSync(TODO_FILE)) {
        todos = JSON.parse(fs.readFileSync(TODO_FILE))
    }

    todos.push({ task: req.body.task, done: false })

    fs.writeFileSync(TODO_FILE, JSON.stringify(todos, null, 2))

    res.json({ message: "Todo lagt til" })
})

app.put("/todos/:index", (req, res) => {
    let todos = []

    if (fs.existsSync(TODO_FILE)) {
        todos = JSON.parse(fs.readFileSync(TODO_FILE))
    }

    const i = parseInt(req.params.index)

    if (todos[i]) {
        todos[i].done = req.body.done

        fs.writeFileSync(TODO_FILE, JSON.stringify(todos, null, 2))

        res.json({ message: "OK" })
    } else {
        res.status(404).json({ message: "Not found" })
    }
})

app.listen(3000, '0.0.0.0', () => {
    console.log("Server running on port 3000")
})