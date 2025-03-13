import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import logoImage from "../../assets/Tarlac_Agricultural_University_logo.png"; 

const LogoContainer = styled(Link)({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
});

const LogoImage = styled("img")({
  height: "70px", // Adjust size as needed
  width: "auto",
  cursor: "pointer",
});

function Logo({ to = "/" }) {
  return (
    <LogoContainer to={to}>
      <LogoImage src={logoImage} alt="Logo" />
    </LogoContainer>
  );
}

export default Logo;