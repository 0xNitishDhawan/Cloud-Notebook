import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home";
import About from "./components/about";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/alert";
import Login from "./components/login";
import SignUp from "./components/signup";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar/>
            <Alert message="This is an amazing Notepad Application"/>
            <div className="container">
              <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/about" element={<About />}/>
                <Route exact path="/login" element={<Login />}/>
                <Route exact path="/signup" element={<SignUp />}/>
              </Routes>
            </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
