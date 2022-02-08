import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useHasBottomSearch() {
  const urls = new Set<string>(["/customers", "/recipes", "/ingredients"]);
  const [hasBottomSearch, setHasBottomSearch] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (urls.has(pathname)) {
      setHasBottomSearch(true);
    } else {
      setHasBottomSearch(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return hasBottomSearch;
}
