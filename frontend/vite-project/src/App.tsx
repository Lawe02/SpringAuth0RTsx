import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import PlayerList from "./Components/Players/PlayerList";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <Navbar />
      {isAuthenticated && <PlayerList />}
    </>
  );
}

export default App;
