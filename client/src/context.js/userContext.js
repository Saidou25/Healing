import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

const userContext = createContext();

function UserProvider({ children }) {
  const [me, setMe] = useState("");

  const { data: meData, loading, error  } = useQuery(QUERY_ME);
 
  useEffect(() => {
    if (meData) {
      const myData = meData?.me || [];
      setMe(myData);
    }
    return;
  }, [meData]);

  return <userContext.Provider value={{ me, loading, error }}>{children}</userContext.Provider>;
}
// Creating context Api hook
function useUser() {
  const context = useContext(userContext);
  if (context === undefined)
    throw new Error("userContext was used outside of the UserProvider");
  return context;
}
export { UserProvider, useUser };
