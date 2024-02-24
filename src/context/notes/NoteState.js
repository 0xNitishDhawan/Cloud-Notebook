// import {useState} from "react";
import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState=(props)=>{
    const notesInitial=[
      {
        "_id": "65d6149f21196a215c0272f8",
        "user": "65d4b515534f100c6f6d5a71",
        "title": "Old List",
        "description": "Icecream",
        "tag": "personal",
        "date": "2024-02-21T15:19:59.531Z",
        "__v": 0
      },
      {
        "_id": "65d627e270262036cfe96e9c",
        "user": "65d4b515534f100c6f6d5a71",
        "title": "Meeting tpday",
        "description": "Today we Have a meeting",
        "tag": "Professional",
        "date": "2024-02-21T16:42:10.821Z",
        "__v": 0
      },
      {
        "_id": "65d75cd279b3d23fc7d5576d",
        "user": "65d4b515534f100c6f6d5a71",
        "title": "Meeting",
        "description": "Today we Have a meeting",
        "tag": "Professional",
        "date": "2024-02-22T14:40:18.401Z",
        "__v": 0
      },
      {
        "_id": "65d9b88bf199cd4d53a19eaa",
        "user": "65d4b515534f100c6f6d5a71",
        "title": "Meeting",
        "description": "Today we Have a meeting",
        "tag": "Professional",
        "date": "2024-02-24T09:36:11.583Z",
        "__v": 0
      },
      {
        "_id": "65d9b88cf199cd4d53a19eac",
        "user": "65d4b515534f100c6f6d5a71",
        "title": "Meeting",
        "description": "Today we Have a meeting",
        "tag": "Professional",
        "date": "2024-02-24T09:36:12.324Z",
        "__v": 0
      },
      {
        "_id": "65d9b88cf199cd4d53a19eae",
        "user": "65d4b515534f100c6f6d5a71",
        "title": "Meeting",
        "description": "Today we Have a meeting",
        "tag": "Professional",
        "date": "2024-02-24T09:36:12.507Z",
        "__v": 0
      }
    ]
    const [notes, setNotes] = useState(notesInitial)

    //Add a Note
    const addNote=(title, description, tag)=>{
      // To Do : API CALL
      let note={
        "_id": "65d6149f21196a215c0272f8",
        "user": "65d4b515534f100c6f6d5a71",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2024-02-21T15:19:59.531Z",
        "__v": 0
      }
      setNotes(notes.concat(note));
    }

    // Delete a Note 
    const deleteNote=(id)=>{
      // To Do : API CALL
      const newNotes=notes.filter((note)=>{return note._id!==id})
      setNotes(newNotes);
    }

    // Update a Note
    const updateNote=(id)=>{

    }
    return (
            <NoteContext.Provider value={{notes, addNote, deleteNote, updateNote}}>
                {props.children}
            </NoteContext.Provider>
    )
}
export default NoteState