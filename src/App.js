import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Viewer from "./pages/viewer";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Profile from "./pages/profile";
import ForgotPassword from "./pages/forgot-password";


const navbarElementsArray = [
  { id: 1, title: "Features", path: "#", scrollTo: 'features_id',  selected: false },
  { id: 2, title: "About Us", path: "#", scrollTo: 'aboutUs_id', selected: false },
  { id: 3, title: "Our team", path: "#", scrollTo: 'ourTeam_id', selected: true },
  { id: 4, title: "Our partners", path: "#", scrollTo: 'ourPartners_id', selected: false },
];

const canvasNavbarElementsArray = [
  {
    id: 1,
    title: "New",
    subItems: [
      { id: 1_1, title: "Project", path: "#" },
      // { id: 1_2, title: "Level", path: "#" },
      // { id: 1_3, title: "Element", path: "#" },
    ],
    path: "#",
    scrollTo: '',
    selected: false,
  },
  { id: 2, title: "Open", path: "#", scrollTo: '', selected: false },
  { id: 3, title: "Export", path: "#", scrollTo: '', selected: false },
];

function App() {
  const [navbarElements, setNavbarElements] = useState([
    "home",
    navbarElementsArray,
  ]);
  const [projectName, setProjectName] = useState(
    "Open a project to Start Working"
  );

  const [projectAttrs, setProjectAttrs] = useState({
    project_id: 1,
    level: 1,
    element_id: 1,
  });

  const [markers, setMarkers] = useState({});
  const [scrollTo, setScrollTo] = useState('heroSection_id')
  const [excelUrl, setExcelUrl] = useState(null)
  const [excelFilename, setExcelFilename] = useState("Untitled.xlsx")

  const location = useLocation();

  useEffect(() => {
    if (window.location.pathname == "/viewer") {
      setNavbarElements(["viewer", canvasNavbarElementsArray]);
    } else {
      setNavbarElements(["home", navbarElementsArray]);
      localStorage.removeItem("clickedItem");
    }
  }, [window.location.pathname]);

  return (
    // <BrowserRouter>
    <>
      <Navbar
        navbarElementsArray={navbarElements}
        projectName={projectName}
        setProjectAttrs={setProjectAttrs}
        setScrollTo = {setScrollTo}
        excelUrl={excelUrl}
        excelFilename={excelFilename}
        setExcelUrl={setExcelUrl}
        setExcelFilename={setExcelFilename}
      />
      <Routes>
        <Route path="/" element={<Home scrollTo = {scrollTo} />} />
        <Route
          path="/viewer"
          element={
            <Viewer
              projectName={projectName}
              setProjectName={setProjectName}
              projectAttrs={projectAttrs}
              setProjectAttrs={setProjectAttrs}
              markers={markers}
              setMarkers={setMarkers}
              setExcelUrl={setExcelUrl}
              setExcelFilename={setExcelFilename}
            />
          }
        />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
      </Routes>
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
