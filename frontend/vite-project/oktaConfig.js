// src/config/oktaConfig.js
export default {
  clientId: "8jRyv3aztKDAOXR3CADEH2L7XmBwzW82",
  issuer: "https://YOUR_OKTA_DOMAIN/oauth2/default",
  redirectUri: window.location.origin + "/login/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
};
