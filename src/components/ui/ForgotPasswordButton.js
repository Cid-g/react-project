import { Button } from "@mui/material";

function ForgotPasswordButton({ onClick }) {
  return (
    <Button
      onClick={onClick}
      sx={{ alignSelf: "flex-end", textTransform: "none" }}
    >
      Forgot Password?
    </Button>
  );
}

export default ForgotPasswordButton;
