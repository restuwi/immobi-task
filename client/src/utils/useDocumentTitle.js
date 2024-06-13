import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useDocumentTitle = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const formattedTitle = pathname.slice(1);
    const capitalizedTitle =
      formattedTitle.charAt(0).toUpperCase() + formattedTitle.slice(1);
    document.title =
      pathname === "/" ? "Immobi" : "Immobi | " + capitalizedTitle;
  }, [pathname]);
};

export default useDocumentTitle;
