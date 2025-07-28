import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type TabType = "products" | "orders" | "users";

interface CMSContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabType>("products");

  return <CMSContext.Provider value={{ activeTab, setActiveTab }}>{children}</CMSContext.Provider>;
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
}
