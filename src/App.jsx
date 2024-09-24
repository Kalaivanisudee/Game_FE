import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GamePage from './components/GamePage';
import AllGamesPage from './components/AllGamesPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<GamePage />} />
                <Route path="/games" element={<AllGamesPage />} />
            </Routes>
        </Router>
    );
}

export default App;
