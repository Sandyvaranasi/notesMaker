const addBtn = document.querySelector('#addBtn')
constmain = document.querySelector('#main')

const saveNotes = () => {
    const notes = document.querySelectorAll('.note textarea');
    const data = [];
    notes.forEach(x => data.push(x.value))
    if (data.length == 0) {
        localStorage.removeItem('notes')
    } else {
        localStorage.setItem('notes', JSON.stringify(data))
    }
}
addBtn.addEventListener(
    'click',
    () => {
        addNote()
    }
)

const addNote = (text = "") => {
    const note = document.createElement('div');
    note.classList.add('note')
    note.innerHTML = `
    <div class="tool">
    <i class="save fa-solid fa-floppy-disk"></i>
    <i class="trash fa-solid fa-trash"></i>
</div>
<textarea>${text}</textarea>
`;
    note.querySelector('.trash').addEventListener(
        'click',
        () => {
            note.remove('.note')
            saveNotes();
        }
    )
    note.querySelector('.save').addEventListener(
        'click', () => saveNotes()
    )
    main.appendChild(note);
    saveNotes();
}
(
    () => {
        const lsNotes = JSON.parse(localStorage.getItem('notes'))
        if (lsNotes == null) {
            addNote()
        } else {
            lsNotes.forEach(x => addNote(x))
        }
    }
)()