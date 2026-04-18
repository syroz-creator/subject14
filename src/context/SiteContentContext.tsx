import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { defaultSiteContent, type SiteContent } from "../site-content";

const SITE_CONTENT_STORAGE_KEY = "subject14-site-content";
const SITE_CONTENT_API_ENDPOINT = "/api/site-content";
const SITE_CONTENT_SAVE_ENDPOINT = "/api/operator/content";

type SiteContentContextType = {
  siteContent: SiteContent;
  setSiteContent: (content: SiteContent) => void;
  reloadSiteContent: () => Promise<void>;
  saveSiteContent: (content: SiteContent) => Promise<{ mode: "server" | "browser" }>;
};

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [siteContent, setSiteContent] = useState<SiteContent>(defaultSiteContent);

  const persistLocally = useCallback((content: SiteContent) => {
    try {
      window.localStorage.setItem(SITE_CONTENT_STORAGE_KEY, JSON.stringify(content));
    } catch {
      // Ignore storage failures and continue using in-memory content.
    }
  }, []);

  const reloadSiteContent = useCallback(async () => {
    try {
      const response = await fetch(SITE_CONTENT_API_ENDPOINT, {
        credentials: "include",
      });

      if (response.ok) {
        const data = (await response.json()) as SiteContent;
        setSiteContent(data);
        persistLocally(data);
        return;
      }
    } catch {
      // Fall back to browser storage below.
    }

    try {
      const stored = window.localStorage.getItem(SITE_CONTENT_STORAGE_KEY);
      if (!stored) {
        setSiteContent(defaultSiteContent);
        return;
      }
      const data = JSON.parse(stored) as SiteContent;
      setSiteContent(data);
    } catch {
      setSiteContent(defaultSiteContent);
    }
  }, [persistLocally]);

  const saveSiteContent = useCallback(
    async (content: SiteContent) => {
      try {
        const response = await fetch(SITE_CONTENT_SAVE_ENDPOINT, {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(content),
        });

        if (response.ok) {
          setSiteContent(content);
          persistLocally(content);
          return { mode: "server" as const };
        }
      } catch {
        // Fall back to browser storage below.
      }

      setSiteContent(content);
      persistLocally(content);
      return { mode: "browser" as const };
    },
    [persistLocally]
  );

  useEffect(() => {
    void reloadSiteContent();
  }, [reloadSiteContent]);

  useEffect(() => {
    persistLocally(siteContent);
  }, [persistLocally, siteContent]);

  return (
    <SiteContentContext.Provider value={{ siteContent, setSiteContent, reloadSiteContent, saveSiteContent }}>
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
