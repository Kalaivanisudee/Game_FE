import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AllGamesPage() {
    const [games, setGames] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGames = async () => {
            const response = await axios.get('https://game-be-c3tb.onrender.com/api/games');
            setGames(response.data);
        };
        fetchGames();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">All Games</h2>
            <table className="table table-striped table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Player 1</th>
                        <th>Player 2</th>
                        <th>Winner</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map((game) => (
                        <tr key={game._id}>
                            <td>{game.player1}</td>
                            <td>{game.player2}</td>
                            <td>{game.winner}</td>
                            <td>{new Date(game.date).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="text-center">
                <button onClick={() => navigate('/')} className="btn btn-primary mt-3">
                    Back to Game
                </button>
            </div>
        </div>
    );
}

export default AllGamesPage;
