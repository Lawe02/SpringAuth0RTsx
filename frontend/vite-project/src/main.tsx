import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import AuthBtn from "./Components/Auth/LoginButton";

const root = createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain="dev-261izk5pkr87u40h.us.auth0.com"
    clientId="8jRyv3aztKDAOXR3CADEH2L7XmBwzW82"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
    <AuthBtn></AuthBtn>
  </Auth0Provider>
);
