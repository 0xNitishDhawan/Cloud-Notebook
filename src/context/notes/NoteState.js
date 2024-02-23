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
        }
      ]
    const [notes, setNotes] = useState(notesInitial)
    return (
            <NoteContext.Provider value={{notes,setNotes}}>
                {props.children}
            </NoteContext.Provider>
    )
}
export default NoteState