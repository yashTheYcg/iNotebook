import { createContext, useState } from 'react';

const NoteContext = createContext();
const NoteState = (props) => {
    const notesInitial = [];
    // const host = "http://localhost:8080";
    const [notes, setNotes] = useState(notesInitial)

    // Get all Notes
    const getNotes = async () => {

        // API CALL
        const response = await fetch(`/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
        });

        const json = await response.json();
        console.log(json);
        setNotes(json);

    }



    // Add a note
    const addNote = async (title, description, tag) => {

        // API CALL
        const response = await fetch(`/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        });

        const note = await response.json();
        // using concat instead of push beacuse concat returns a new array
        setNotes(notes.concat(note));

    }


    // Delete a note
    const deleteNote = async (id) => {
        //   API CALL
        const response = await fetch(`/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
        });

    
        // if condition matched then that note will delete
        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote);
    }


    // Edit a note
    const editNote = async (id, title, description, tag) => {
        console.log(id);
        // TODO: API CALL
        const response = await fetch(`/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        });

        let newNotes = JSON.parse(JSON.stringify(notes))
        // logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title
                newNotes[index].description = description
                newNotes[index].tag = tag
                break;
            }
        }

        setNotes(newNotes);
    }


    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
export { NoteContext };