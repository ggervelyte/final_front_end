import './App.css';
import MainContext from './context/mainContext.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import FilterPage from './pages/FilterPage';
import LikesAndDislikesPage from './pages/LikesAndDislikesPage';
import HistoryPage from './pages/HistoryPage';
import { useState } from 'react';


function App() {
    const [user, setUser] = useState(null)
    const [allUsers, setAllUsers] = useState(null)
    const [filteredUsers, setFilteredUsers] = useState([])
    const [likedUsers, setLikedUsers] = useState([])
    const [likes, setLikes] = useState([])

    return (
        <div className="App">
            <MainContext.Provider value={{ user, setUser, allUsers, setAllUsers, filteredUsers, setFilteredUsers, likedUsers, setLikedUsers, likes, setLikes }}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route path='/register' element={<RegisterPage />} />
                        <Route path='/profile' element={<ProfilePage />} />
                        <Route path='/filter' element={<FilterPage />} />
                        <Route path='/swipe' element={<LikesAndDislikesPage />} />
                        <Route path='/history' element={<HistoryPage />} />
                    </Routes>
                </BrowserRouter>
            </MainContext.Provider>
        </div>
    );
}

export default App;
