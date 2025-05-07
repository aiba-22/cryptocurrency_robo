import { LinearProgress, Box, Typography } from "@mui/material";

function Loading() {
  return (
    <Box>
      <Typography>Loading...</Typography>
      <LinearProgress />
    </Box>
  );
}

export default Loading;
