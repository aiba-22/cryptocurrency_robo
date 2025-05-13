import { Container } from "@mui/material";
import { LineSetting } from "./lineSetting";
import { GmoSetting } from "./gmoSetting";

export const Setting = () => {
  return (
    <Container>
      <LineSetting></LineSetting>
      <GmoSetting></GmoSetting>
    </Container>
  );
};
