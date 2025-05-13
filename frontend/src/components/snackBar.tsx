import { Alert, Box } from "@mui/material";

type snackberProps = { message: string };
const SnackBer: React.FC<snackberProps> = ({ message }) => {
  return (
    <>
      {message && (
        <Box mt={2}>
          <Alert severity="info">{message}</Alert>
        </Box>
      )}
    </>
  );
};

export default SnackBer;
