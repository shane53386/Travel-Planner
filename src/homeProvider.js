
import React, { createContext, useState,useContext } from "react";

export const HomeContext = createContext();

export function useHome() {
	return useContext(HomeContext);
}

// This context provider is passed to any component requiring the context
export const HomeProvider = ({ children }) => {
  const [plan, setPlan] = useState("");
  const [data, setData] = useState([]);

  return (
    <HomeContext.Provider
      value={{
       plan,data,
        setData,setPlan
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};