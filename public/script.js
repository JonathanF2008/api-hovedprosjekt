// ----- NOTATER -----
async function loadNotes() {
    const res = await fetch("/notes")
    const data = await res.json()

    const list = document.getElementById("notesList")
    list.innerHTML = ""

    data.forEach(note => {
        const li = document.createElement("li")
        li.innerHTML = `<strong>${note.title}</strong><br>${note.content}`
        list.appendChild(li)
    })
}

async function addNote() {
    const titleInput = document.getElementById("noteTitle")
    const contentInput = document.getElementById("noteContent")

    if (!titleInput.value || !contentInput.value) {
        alert("Fyll inn både tittel og notat")
        return
    }

    await fetch("/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: titleInput.value,
            content: contentInput.value
        })
    })

    titleInput.value = ""
    contentInput.value = ""
    loadNotes()
}


async function loadTodos() {
    const res = await fetch("/todos")
    const data = await res.json()

    const list = document.getElementById("todoList")
    list.innerHTML = ""

    data.forEach((todo, index) => {
        const li = document.createElement("li")
        li.className = todo.done ? "done" : ""

        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.checked = todo.done

        checkbox.addEventListener("change", async () => {
            await toggleTodo(index, checkbox.checked)
            li.className = checkbox.checked ? "done" : ""
        })

        const span = document.createElement("span")
        span.textContent = todo.task

        li.appendChild(checkbox)
        li.appendChild(span)

        list.appendChild(li)
    })
}

async function addTodo() {
    const input = document.getElementById("todoInput")
    if (!input.value) return

    await fetch("/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: input.value }) // ⚠️ må hete 'task'
    })

    input.value = ""
    loadTodos()
}

async function toggleTodo(index, done) {
    await fetch(`/todos/${index}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done })
    })
}

loadNotes()
loadTodos()