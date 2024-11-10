import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export default function PlayerList() {
  const { isAuthenticated } = useAuth0(); // Get isAuthenticated from Auth0

  const [players] = useState([
    { id: 1, name: "John Doe", position: "Forward" },
    { id: 2, name: "Jane Smith", position: "Midfielder" },
    { id: 3, name: "Mark Johnson", position: "Defender" },
  ]);

  //   useEffect(() => {
  //     console.log(user);
  //   });

  return isAuthenticated ? (
    <div>
      <h2>Player List</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id} style={{ marginBottom: "10px" }}>
            <span>
              {player.name} - {player.position}
            </span>
            <button style={{ marginLeft: "10px" }}>Update</button>
            <button
              style={{
                marginLeft: "10px",
                backgroundColor: "red",
                color: "white",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div> U need to logged in</div>
  );
}
