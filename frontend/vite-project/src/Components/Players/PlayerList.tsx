import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import "./PlayerList.css";
import { fetchPlayers } from "../../Services/Data/Api";

export default function PlayerList() {
  const { isAuthenticated } = useAuth0();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["participants"],
    queryFn: fetchPlayers,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || data == undefined)
    return (
      <div>
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );

  return isAuthenticated ? (
    <div className="player-list-container">
      <h2 className="player-list-title">Player List</h2>
      <ul className="player-list">
        {data.players.map((player) => (
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
