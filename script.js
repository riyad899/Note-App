const createNoteButton = document.querySelector('.Btn');
const notesContainer = document.querySelector(".container");

// Function to save notes to local storage
function saveNotes() {
    const notes = [];
    document.querySelectorAll('.input-box').forEach(note => {
        const text = note.querySelector('p').innerText;
        notes.push(text);
    });
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Function to display notes from local storage
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.forEach(text => {
        createNoteElement(text);
    });
}

// Function to create a new note element
function createNoteElement(text = "New Note") {
    let noteContainer = document.createElement("div");
    noteContainer.className = "input-box";

    let inputbox = document.createElement("p");
    inputbox.setAttribute("contenteditable", "true");
    inputbox.className = "input";
    inputbox.textContent = text;

    let img = document.createElement("img");
    img.src = "image/png-transparent-delete-key-logo-button-text-rectangle-logo-thumbnail-removebg-preview.png";
    img.className = "delete-button";
    img.alt = "Delete";

    noteContainer.appendChild(inputbox);
    noteContainer.appendChild(img);
    notesContainer.appendChild(noteContainer);

    // Event listener to delete note and update local storage
    img.addEventListener("click", () => {
        noteContainer.remove();
        saveNotes();
    });

    // Event listener to save notes when content is modified
    inputbox.addEventListener("input", saveNotes);
}

// Load notes from local storage on page load
window.addEventListener("load", loadNotes);

// Create a new note when the button is clicked
createNoteButton.addEventListener("click", () => {
    createNoteElement();
    saveNotes();
});
