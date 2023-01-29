import { useState } from "react";

import { QueryInfoContext } from "./queryInfoContext";
import { useRouter } from "next/router";

const TabProvider = ({ children }: { children: JSX.Element }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <QueryInfoContext.Provider
      value={{
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </QueryInfoContext.Provider>
  );
};

export { QueryInfoContext, TabProvider };
