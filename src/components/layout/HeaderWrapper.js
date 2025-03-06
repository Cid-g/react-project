import React, { useState, useEffect } from "react";
import { AppBar, Toolbar } from "@mui/material";
import { styled } from "@mui/system";

const HeaderWrapper = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "isHidden",
})(({ isHidden }) => ({
  position: "fixed",
  top: isHidden ? "-110px" : "0", // Hide when scrolling down
  left: 0,
  width: "100%",
  zIndex: 1000,
  background: "#181818", // Clean, solid dark color
  transition: "top 0.3s ease-in-out, background 0.3s ease-in-out",
  boxShadow: isHidden ? "none" : "0px 2px 10px rgba(0, 0, 0, 0.2)", // Light shadow when visible
  padding: "12px 20px", // Minimal padding for spacing
}));

function Header({ children }) {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsHidden(currentScrollY > lastScrollY && currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <HeaderWrapper isHidden={isHidden}>
     {children}
    </HeaderWrapper>
  );
}

export default Header;
