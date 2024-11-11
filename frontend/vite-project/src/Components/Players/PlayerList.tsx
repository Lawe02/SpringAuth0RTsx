import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import "./PlayerList.css";
import { fetchPlayers } from "../../Services/Data/Api";
import { useState } from "react";

export default function PlayerList() {
  const { isAuthenticated, user } = useAuth0();
  const [showList, setShowList] = useState(true); // Controls visibility of the player list
  const [showCreateForm, setShowCreateForm] = useState(false);

  const toggleCreateForm = () => {
    if (showCreateForm == false) {
      setShowList(false);
      setShowCreateForm(true);
    } else {
      setShowList(true);
      setShowCreateForm(false);
    }
  };

  const coachName = user?.email || "undefined";

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["players", coachName],
    queryFn: () => fetchPlayers(coachName),
    enabled: !!coachName, // Only run if coachName is defined
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError || !data || !data)
    return (
      <div>
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );

  return (
    <div className="player-list-container">
      {/* Toggle Button for Create Player Form */}
      <div className="toggle-btn-container">
        <button className="toggle-btn" onClick={toggleCreateForm}>
          {showCreateForm ? "Cancel" : "Create New Player"}
        </button>
      </div>

      {/* Conditionally Render Player List */}
      {showList && isAuthenticated && (
        <div className="player-list-section">
          <h2 className="player-list-title">
            Player List for Coach {coachName}
          </h2>
          <ul className="player-list">
            {data.map((player) => (
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
      )}

      {/* Conditionally Render Create Player Form */}
      {showCreateForm && (
        <div className="create-player-form">
          <h3>Create a New Player</h3>
          {/* Your form here */}
          <form>
            <div>
              <label>Name</label>
              <input type="text" name="playerName" />
            </div>
            <div>
              <label>Position</label>
              <input type="text" name="playerPosition" />
            </div>
            <button type="submit">Create Player</button>
          </form>
        </div>
      )}
    </div>
  );
}
