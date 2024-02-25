import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home";
import About from "./components/about";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/alert";
import Login from "./components/login";
import SignUp from "./components/signup";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState(null);
   
  const showAlert=(msg, type)=>{
    setAlert({
      message:msg,
      type:type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1200);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar showAlert={showAlert} />
            <Alert alert={alert}/>
            <div className="container">
              <Routes>
                <Route exact path="/" element={<Home showAlert={showAlert} />}/>
                <Route exact path="/about" element={<About />}/>
                <Route exact path="/login" element={<Login showAlert={showAlert} />}/>
                <Route exact path="/signup" element={<SignUp showAlert={showAlert} />}/>
              </Routes>
            </div>
        </Router>
      </NoteState> 
    </>
  ); 
}

export default App;
