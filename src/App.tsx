import "./css/App.css"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./components/MainPage/MainPage.tsx";
import MyMusic from "./pages/MyMusic.tsx";
import Tracks from "./pages/Tracks.tsx";
import Artists from "./pages/Artists.tsx";
import Other from "./pages/Other.tsx";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

function App() {
    return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage/>}></Route>
                <Route path="/my_music" element={<MyMusic/>}></Route>
                <Route path="/tracks" element={<Tracks/>}></Route>
                <Route path="/creators" element={<Artists/>}></Route>
                <Route path="/other" element={<Other/>}></Route>
                <Route path="/register" element={<SignUp/>}></Route>
                <Route path="/login" element={<SignIn/>}></Route>
                <Route index path="/login" element={<SignIn/>}></Route>
            </Routes>
        </BrowserRouter>
    </div>
    )
}

export default App
