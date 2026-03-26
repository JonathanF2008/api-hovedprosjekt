// Hent og vis alle notater
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

// Legg til nytt notat
async function addNote() {
    const titleInput = document.getElementById("noteTitle")
    const contentInput = document.getElementById("noteContent")

    if (!titleInput.value || !contentInput.value) {
        alert("Fyll inn både tittel og notat")
        return
    }

    await fetch("/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: titleInput.value,
            content: contentInput.value
        })
    })

    titleInput.value = ""
    contentInput.value = ""
    loadNotes()
}

// Last inn notater når siden åpnes
loadNotes()