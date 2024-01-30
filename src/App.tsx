import React, {useEffect} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import MyMusic from './pages/MyMusic.tsx';
import Main from './pages/Main.tsx';
import Tracks from './pages/Tracks.tsx';
import Artists from './pages/Artists.tsx';
import Library from './pages/Library.tsx';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import {auth} from '@firebase/config.js';
import "./css/App.css";
import MusicPlayer from "./components/UI/MusicPlayer";

const routes = [
    { path: '/', element: <SignIn /> },
    { path: '/main', element: <Main /> },
    { path: '/my_music', element: <MyMusic /> },
    { path: '/tracks', element: <Tracks /> },
    { path: '/creators', element: <Artists /> },
    { path: '/library', element: <Library /> },
    { path: '/register', element: <SignUp /> },
];

const PrivateRoute = ({ element }) => {

    useEffect(() => {
        const checkAuth = async () => {
            const storedUser = localStorage.getItem('currentUser');

            if (!storedUser) {
                await auth.currentUser;
                localStorage.setItem('currentUser', JSON.stringify(auth.currentUser));
            }
        }
        checkAuth();
    }, []);

    return localStorage.getItem("currentUser") ? element : <Navigate to="/" />;
};

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {routes.map(({ path, element }) => (
                        <Route key={path} path={path} element={<PrivateRoute element={element} />} />
                    ))}
                </Routes>
            </BrowserRouter>
            <MusicPlayer />
        </div>
    );
}

export default App;
