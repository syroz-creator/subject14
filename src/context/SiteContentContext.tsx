import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { defaultSiteContent, type SiteContent } from "../site-content";

type SiteContentContextType = {
  siteContent: SiteContent;
  setSiteContent: (content: SiteContent) => void;
  reloadSiteContent: () => Promise<void>;
};

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [siteContent, setSiteContent] = useState<SiteContent>(defaultSiteContent);

  const reloadSiteContent = useCallback(async () => {
    try {
      const response = await fetch("/api/site-content");
      if (!response.ok) {
        return;
      }

      const data = (await response.json()) as SiteContent;
      setSiteContent(data);
    } catch {
      // Use local defaults when the content API is unavailable.
    }
  }, []);

  useEffect(() => {
    void reloadSiteContent();
  }, [reloadSiteContent]);

  return (
    <SiteContentContext.Provider value={{ siteContent, setSiteContent, reloadSiteContent }}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error("useSiteContent must be used within a SiteContentProvider");
  }
  return context;
}
