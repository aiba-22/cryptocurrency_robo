import { Alert, Box } from "@mui/material";

type SnackBarProps = { message: string };
export const Snackbar: React.FC<SnackBarProps> = ({ message }) => {
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
