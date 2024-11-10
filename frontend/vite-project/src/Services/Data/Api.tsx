import axios from "axios";

export interface Player {
  id: string;
  name: string;
  position: string;
}

export interface Players {
  players: Player[];
}
const players: Players = {
  players: [
    { id: "1", name: "John Doe", position: "Forward" },
    { id: "2", name: "Jane Smith", position: "Midfielder" },
    { id: "3", name: "Mark Johnson", position: "Defender" },
  ],
};

export const fetchPlayers = async (): Promise<Players> => {
  const response = await axios.get<Players>("test");
  response.data = players;
  return response.data;
};
