
import React, { createContext, useState } from "react";

export const MContext = createContext();

// This context provider is passed to any component requiring the context
export const Provider = ({ children }) => {
  const [data, setData] = useState(new Map());


  return (
    <MContext.Provider
      value={{
       data,
        setData
      }}
    >
      {children}
    </MContext.Provider>
  );
};