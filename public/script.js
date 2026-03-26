// todo.js

// Filnavn for todo-liste
const TODO_FILE = "todo.json"

// Hent og vis alle todo-oppgaver
async function loadTodos() {
    const res = await fetch("/todos")
    const data = await res.json()

    const list = document.getElementById("todoList")
    list.innerHTML = ""

    data.forEach((todo, index) => {
        const li = document.createElement("li")
        
        // Checkbox for å krysse av oppgave
        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.checked = todo.done
        checkbox.addEventListener("change", () => toggleTodo(index))

        // Oppgave-tekst
        const text = document.createElement("span")
        text.textContent = todo.text
        if (todo.done) text.style.textDecoration = "line-through"

        li.appendChild(checkbox)
        li.appendChild(text)
        list.appendChild(li)
    })
}

// Legg til ny todo-oppgave
async function addTodo() {
    const input = document.getElementById("todoInput")
    const text = input.value.trim()

    if (!text) return

    await fetch("/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text, done: false })
    })

    input.value = ""
    loadTodos()
}

// Oppdater status på todo
async function toggleTodo(index) {
    await fetch(`/todos/${index}`, {
        method: "PATCH"
    })

    loadTodos()
}

// Last inn todo-liste når siden åpnes
loadTodos()