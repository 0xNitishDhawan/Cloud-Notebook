import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home";
import About from "./components/about";
import NoteState from "./context/notes/NoteState";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar/>
            <div className="container">
              <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/about" element={<About />}/>
              </Routes>
            </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
