import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// create context
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  // const [isAuth, setIsAuth] = useState(false)
  // const [role, setRole] = useState('')

  const [infos, setInfos] = useState({ isAuth: false, role: "" });
  const getData = async () => {
    const { data } = await axios.get("http://localhost:4040");
    if (data) {
        console.log("message", data);
        setInfos(data);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <UserContext.Provider value={{ infos,setInfos }}>
      {children}
    </UserContext.Provider>
  );
};
