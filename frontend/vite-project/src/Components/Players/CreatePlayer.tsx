import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { createPlayer } from "../../Services/Data/Api";
import "./PlayerList.css";

export default function CreatePlayerForm() {
  const { user } = useAuth0();
  const coachName = user?.email || "undefined";

  const [playerName, setPlayerName] = useState("");
  const [playerPosition, setPlayerPosition] = useState("");

  const mutation = useMutation({
    mutationFn: createPlayer,
    onSuccess: (newPlayer) => {
      console.log("Player created:", newPlayer);
    },
    onError: (error) => {
      console.error("Error creating player:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ coachName, name: playerName, position: playerPosition });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Player Name:</label>
        <input
          type="text"
          id="name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="position">Player Position:</label>
        <input
          type="text"
          id="position"
          value={playerPosition}
          onChange={(e) => setPlayerPosition(e.target.value)}
        />
      </div>
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Creating Player..." : "Create Player"}
      </button>
      {mutation.isError && <div>Error creating player.</div>}
    </form>
  );
}
