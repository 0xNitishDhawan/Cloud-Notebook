import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import Noteitem from "./noteitem";
import AddNote from "./addnote";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes } = context;
  return (
    <>
      <AddNote/>
      <div className="row my-3">
        <h2 className="my-3">Your Notes</h2>
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
