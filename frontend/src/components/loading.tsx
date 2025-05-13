import { LinearProgress, Box, Typography } from "@mui/material";

export const Loading = () => {
  return (
    <Box>
      <Typography>Loading...</Typography>
      <LinearProgress />
    </Box>
  );
};
