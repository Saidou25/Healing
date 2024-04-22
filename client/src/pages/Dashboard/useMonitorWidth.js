import{ useEffect, useState } from "react";

const useMonitorWidth = () => {
    const [showDashboardMediaNav, setShowDashboardMediaNav] = useState(false);
const [vw, setVw] = useState("");

useEffect(() => {
  const handleResize = () => {
          // console.log(window.innerWidth)
          if (window.innerWidth <= 414) {
            setShowDashboardMediaNav(true);
            setVw(window.innerWidth);
          } else {
            setVw(window.innerWidth);
            setShowDashboardMediaNav(false);
          }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
    
        return () => window.removeEventListener("resize", handleResize);
      }, []);
      return { showDashboardMediaNav, vw };
}
export default useMonitorWidth;