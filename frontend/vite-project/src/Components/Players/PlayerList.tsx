import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./PlayerList.css"; // Import the CSS file

export default function PlayerList() {
  const { isAuthenticated } = useAuth0(); // Get isAuthenticated from Auth0

  const [players] = useState([
    { id: 1, name: "John Doe", position: "Forward" },
    { id: 2, name: "Jane Smith", position: "Midfielder" },
    { id: 3, name: "Mark Johnson", position: "Defender" },
  ]);

  return isAuthenticated ? (
    <div className="player-list-container">
      <h2 className="player-list-title">Player List</h2>
      <ul className="player-list">
        {players.map((player) => (
          <li key={player.id} className="player-item">
            <div className="player-info">
              <span className="player-name">{player.name}</span>
              <span className={`player-position ${player.position}`}>
                {player.position}
              </span>
            </div>
            <div className="player-actions">
              <button className="update-btn">Update</button>
              <button className="delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div className="unauthenticated-message">
      You need to be logged in to manage players!
    </div>
  );
}
