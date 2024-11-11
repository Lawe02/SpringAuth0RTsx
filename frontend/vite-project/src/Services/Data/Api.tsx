import axios from "axios";

export interface Player {
  id: string;
  name: string;
  position: string;
}

export interface CreatePlayerRequest {
  coachName: string;
  name: string;
  position: string;
}

export const fetchPlayers = async (name: string): Promise<Player[]> => {
  const response = await axios.get<Player[]>(
    `http://localhost:8080/api/coach/${name}/players`
  );
  console.log(response);
  return response.data;
};

export const createPlayer = async (
  playerReq: CreatePlayerRequest
): Promise<Player[]> => {
  const response = await axios.post(
    `http://localhost:8080/api/coach/players`,
    playerReq
  );
  console.log(response);
  return response.data;
};
