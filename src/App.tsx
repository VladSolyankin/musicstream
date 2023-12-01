import "./css/App.css"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./components/MainPage/MainPage.tsx";
import MyMusic from "./components/MyMusic/MyMusic.tsx";
import Tracks from "./components/Tracks/Tracks.tsx";
import Creators from "./components/Creators/Creators.tsx";
import Other from "./components/Other/Other.tsx";

function App() {

  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage/>}></Route>
                <Route path="/my_music" element={<MyMusic />}></Route>
                <Route path="/tracks" element={<Tracks />}></Route>
                <Route path="/creators" element={<Creators />}></Route>
                <Route path="/other" element={<Other />}></Route>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
