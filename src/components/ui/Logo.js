
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";



    const LogoText = styled(Typography)({
        flexGrow: 1,
        fontSize: "1.7rem",
        fontWeight: "bold",
        color: "red",
        textTransform: "uppercase",
        letterSpacing: "2px",
        cursor: 'pointer',
      });
      function Logo({to = "/"}){
      return  <LogoText component={Link} to={to} >CED</LogoText>

}
export default Logo;