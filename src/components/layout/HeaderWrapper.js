// src/components/layout/HeaderWrapper.js
import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import { drawerWidth } from "../../constants";

const HeaderWrapper = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "isHidden",
})(({ isHidden, theme }) => ({
  position: "fixed",
  top: isHidden ? "-164px" : "0",
  left: 0,
  width: "100%",
  zIndex: theme.zIndex.drawer + 1,
  background: "#181818",
  transition: "top 0.3s ease-in-out",
  boxShadow: isHidden ? "none" : "0px 2px 10px rgba(0, 0, 0, 0.2)",
  padding: "12px 20px",
}));

function Header({ children, isMenuOpen, onMenuToggle }) {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    // Reset hidden state when menu opens
    if (isMenuOpen) {
      setIsHidden(false);
      window.scrollTo(0, 0);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const shouldHide = currentScrollY > lastScrollY && currentScrollY > 50;
      setLastScrollY(currentScrollY);
      if (shouldHide !== isHidden) {
        setIsHidden(shouldHide);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMenuOpen]);

  return (
    <HeaderWrapper isHidden={isHidden}>
      <Toolbar>
        {children}
      </Toolbar>
    </HeaderWrapper>
  );
}

export default Header;