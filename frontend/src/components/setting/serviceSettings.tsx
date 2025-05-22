import { Container } from "@mui/material";
import { LineSetting } from "./lineSetting";
import { GmoSetting } from "./gmoSetting";

export const ServiceSettings = () => {
  return (
    <Container>
      <LineSetting></LineSetting>
      <GmoSetting></GmoSetting>
    </Container>
  );
};
