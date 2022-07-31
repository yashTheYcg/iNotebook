import React, { useContext,useState } from 'react'
import { NoteContext } from "../Context/notes/NoteState"

const AddNote = (props) => {
    const { addNote } = useContext(NoteContext);
    const [note, setNote] = useState({title:"",description:"",tag:""})
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        console.log("clicked");
        setNote({title:"",description:"",tag:""})
        props.showAlert("Added Successfully","success");
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <div className="container my-3">
                <h1>Add a Note</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={onChange}/>
                        <div id="title" className="form-text">Please fill atleast 6 character to add the note</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label" >Description</label>
                        <textarea type="text" className="form-control" id="description" name='description' value={note.description} rows="4" onChange={onChange} />
                        <div id="description" className="form-text">Please fill atleast 6 character to add the note</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
                    </div>
                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
