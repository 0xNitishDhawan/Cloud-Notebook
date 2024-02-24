import React, { useContext,useState, useEffect, useRef } from "react";
import NoteContext from "../context/notes/NoteContext";
import Noteitem from "./noteitem";
import AddNote from "./addnote";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNotes } = context;
  useEffect( () => {  
     getNotes();
  }, [])

  const [note, setNote]=useState({"etitle":"","edescription":"","etag":""})
  const handleClick=(e)=>{
      e.preventDefault();
      console.log("Updating the node", note);


  }
  const onChange=(e)=>{
      setNote({...note,[e.target.name]: e.target.value});
  }

  const updateNote=(currentNote)=>{
    ref.current.click();
    setNote({etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
  }
  const ref = useRef(null)

  return (
    <>
      <AddNote/>

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='container my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange}/>
                </div>
                
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Create Note</button>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2 className="my-3">Your Notes</h2>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
