import React, { createContext, useState } from 'react';

const schema = {
  name: '',
  cycle: '',
  price: 0,
};

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [data, setData] = useState(schema);

  return (
    <AppContext.Provider value={{ data, setData }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
