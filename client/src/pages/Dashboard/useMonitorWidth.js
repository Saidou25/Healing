import{ useEffect, useState } from "react";

const useMonitorWidth = () => {
    const [showDashboardMediaNav, setShowDashboardMediaNav] = useState(false);

    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth <= 414) {
            setShowDashboardMediaNav(true);
          } else {
            setShowDashboardMediaNav(false);
          }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
    
        return () => window.removeEventListener("resize", handleResize);
      }, []);
      return { showDashboardMediaNav };
}
export default useMonitorWidth;