import FormContainer from "../components/layout/RootContainer.js";
import CardWrapper from "../components/layout/CardWrapper.js";
import { FormControl, Typography } from "@mui/material";
import InputField from "../components/ui/InputField.js";
import FormsButton from "../components/ui/FormButton.js";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

function ForgotPassword(){

    return(
<FormContainer>
    <CardWrapper>
    <Typography variant="h1" sx={{ fontSize: "clamp(2.0rem, 10vw, 2rem)" }}>
            Forgot your Password
    </Typography>
    <Typography variant="h6" sx={{fontSize: "clamp(0.7rem, 3.5vw, 0.7rem)" }}>
        We will send an Instruction to your email
    </Typography>
    <FormControl>
        <InputField 
        label= "Email"/>
    </FormControl>

    <FormsButton 
    label= "Submit"
    />
            <Typography sx={{ textAlign: "center" }}>
              Go back to Login?{" "}
              <Link component={RouterLink} to="/login" style={{ cursor: "pointer", textDecoration: "none" }}>
                Login
              </Link>
            </Typography>
    </CardWrapper>
</FormContainer>
)
}
export default ForgotPassword