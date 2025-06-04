import { Container } from "@mui/material";
import { LineSetting } from "./Line";
import { GmoSetting } from "./Gmo";

export const ServiceSettingsContainer = () => {
  return (
    <Container>
      <LineSetting />
      <GmoSetting />
    </Container>
  );
};
