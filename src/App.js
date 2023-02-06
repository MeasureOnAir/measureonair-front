import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/homePage/Home";
import Viewer from "./pages/viewer/Viewer";

import { createBrowserHistory } from "history";
let history = createBrowserHistory();

const navbarElementsArray = [
  { id: 1, title: "Features", path: "#", selected: false },
  { id: 2, title: "About Us", path: "#", selected: false },
  { id: 3, title: "Our team", path: "#", selected: true },
  { id: 4, title: "Our partners", path: "/viewer", selected: false },
];

const canvasNavbarElementsArray = [
  {
    id: 1,
    title: "New",
    subItems: [
      { id: 1_1, title: "Project", path: "#" },
      { id: 1_2, title: "Level", path: "#" },
      { id: 1_3, title: "Element", path: "#" },
    ],
    path: "#",
    selected: false,
  },
  { id: 2, title: "Open", path: "#", selected: false },
  { id: 3, title: "Save", path: "#", selected: true },
  { id: 4, title: "Export", path: "/", selected: false },
];

function App() {
  const [navbarElements, setNavbarElements] = useState([
    "home",
    navbarElementsArray,
  ]);
  const [projectName, setProjectName] = useState("Cool Structures jkdjfkdf endabcdefghdijfjf")

  const location = useLocation();

  useEffect(() => {
    if (window.location.pathname == "/viewer") {
      setNavbarElements(["viewer", canvasNavbarElementsArray]);
    } else {
      setNavbarElements(["home", navbarElementsArray]);
      localStorage.removeItem('clickedItem')
    }
  }, [window.location.pathname]);

  return (
    // <BrowserRouter>
    <>
      <Navbar navbarElementsArray={navbarElements} projectName = {projectName}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/viewer" element={<Viewer projectName = {projectName} setProjectName = {setProjectName} />} />
      </Routes>
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
