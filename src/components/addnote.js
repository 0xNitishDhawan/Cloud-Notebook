import React, {useContext, useState} from 'react'
import NoteContext from '../context/notes/NoteContext';

const Addnote = (props) => {
    const context=useContext(NoteContext);
    const {addNote}=context;

    const [note, setNote]=useState({"title":"","description":"","tag":""})
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({"title":"","description":"","tag":""})
        props.showAlert("Added Note Successfully","success");
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]: e.target.value});
    }
  return (
    <>
        <div className="container my-3">
        <h2 className='my-3'>Add a Note</h2>
        </div>

        <form className='container my-3'>
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={onChange} />
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange}/>
        </div>
        
        <button type="submit" className="btn btn-primary" onClick={handleClick}>Create Note</button>
        </form>
    </>
  )
}

export default Addnote