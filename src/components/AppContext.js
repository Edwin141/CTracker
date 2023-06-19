// AppContext.js
import React from "react";

const AppContext = React.createContext({
  favoriteCoins: new Set(),
  toggleFavorite: () => {},
});

export default AppContext;
