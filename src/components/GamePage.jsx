import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const choices = ['Stone', 'Paper', 'Scissors'];

function GamePage() {
    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');
    const [rounds, setRounds] = useState([]);
    const [winner, setWinner] = useState('');
    const [currentRound, setCurrentRound] = useState(1);
    const [player1Choice, setPlayer1Choice] = useState('');
    const [player2Choice, setPlayer2Choice] = useState('');
    const [score, setScore] = useState({ player1: 0, player2: 0 });

    const navigate = useNavigate();

    const playRound = () => {
        let result = '';

        if (player1Choice === player2Choice) {
            result = 'Tie';
        } else if (
            (player1Choice === 'Stone' && player2Choice === 'Scissors') ||
            (player1Choice === 'Scissors' && player2Choice === 'Paper') ||
            (player1Choice === 'Paper' && player2Choice === 'Stone')
        ) {
            result = player1;
            setScore({ ...score, player1: score.player1 + 1 });
        } else {
            result = player2;
            setScore({ ...score, player2: score.player2 + 1 });
        }

        setRounds([...rounds, { player1Choice, player2Choice, result }]);

        if (currentRound === 6) {
            setWinner(score.player1 > score.player2 ? player1 : player2);
            saveGame();
        } else {
            setCurrentRound(currentRound + 1);
        }
    };

    const saveGame = async () => {
        await axios.post('http://localhost:8000/api/games', {
            player1,
            player2,
            rounds,
            winner,
        });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Stone, Paper, Scissors</h2>
            {winner ? (
                <div className="alert alert-success text-center">
                    <h3>Winner: {winner}</h3>
                </div>
            ) : (
                <div>
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Player 1 Name"
                                value={player1}
                                onChange={(e) => setPlayer1(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Player 2 Name"
                                value={player2}
                                onChange={(e) => setPlayer2(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="text-center">
                        <h4>Round {currentRound}</h4>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label>Player 1 Choice:</label>
                                <select
                                    className="form-select"
                                    onChange={(e) => setPlayer1Choice(e.target.value)}
                                >
                                    <option value="">Select</option>
                                    {choices.map((choice, index) => (
                                        <option key={index} value={choice}>
                                            {choice}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label>Player 2 Choice:</label>
                                <select
                                    className="form-select"
                                    onChange={(e) => setPlayer2Choice(e.target.value)}
                                >
                                    <option value="">Select</option>
                                    {choices.map((choice, index) => (
                                        <option key={index} value={choice}>
                                            {choice}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button className="btn btn-success" onClick={playRound}>
                            Play Round
                        </button>
                    </div>
                </div>
            )}
            <div className="text-center mt-3">
                <button onClick={() => navigate('/games')} className="btn btn-primary">
                    View All Games
                </button>
            </div>
        </div>
    );
}

export default GamePage;
