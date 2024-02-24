// import {useState} from "react";
import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);


  //Get all Notes
  const getNotes=async ()=>{
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkNGI1MTU1MzRmMTAwYzZmNmQ1YTcxIn0sImlhdCI6MTcwODUyMzc2MH0.38fY9U_NvhWkN9WYqS6oU8o-DTWrmy2W4HUjk4U3NDE",
      },
    });
    const json =await response.json();
    console.log("get notes : ",json)
    setNotes(json);
  } 

  //ADD a Note
  const addNote = async (title, description, tag) => {
    // API call to ADD Note
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkNGI1MTU1MzRmMTAwYzZmNmQ1YTcxIn0sImlhdCI6MTcwODUyMzc2MH0.38fY9U_NvhWkN9WYqS6oU8o-DTWrmy2W4HUjk4U3NDE",
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json =await response.json();
    
    console.log("Adding a new note", json);
    let note = {
      _id: "65d6149f21196a215c0272f8",
      user: "65d4b515534f100c6f6d5a71",
      title: title,
      description: description,
      tag: tag,
      date: "2024-02-21T15:19:59.531Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  // Delete a Note
  const deleteNote = async (id) => {
    // API call to DELETE Note
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkNGI1MTU1MzRmMTAwYzZmNmQ1YTcxIn0sImlhdCI6MTcwODUyMzc2MH0.38fY9U_NvhWkN9WYqS6oU8o-DTWrmy2W4HUjk4U3NDE",
      },
    });
    const json =await response.json();
    console.log(json) 

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Update a Note
  const updateNote = async (id, title, description, tag) => {
    // API CALL to Update Note
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkNGI1MTU1MzRmMTAwYzZmNmQ1YTcxIn0sImlhdCI6MTcwODUyMzc2MH0.38fY9U_NvhWkN9WYqS6oU8o-DTWrmy2W4HUjk4U3NDE",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json =await response.json();
    console.log(json)

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if(element._id === id){
          element.title=title;
          element.description=description;
          element.tag=tag;
      }      
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote , getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
