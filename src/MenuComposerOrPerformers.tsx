import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import BigText from "./BigText";
import { useNavigate } from "react-router-dom";
import GhostButton from "./GhostButton";

const MenuComposerOrPerformers = () => {
  const navigate = useNavigate();
  const style: React.CSSProperties = {
    height: "100vh",
    width: "50%",
    justifyContent: "center",
    alignItems: " center",
    lineHeight: "100vh",
  };
  const fontSize = 40;
  const [onEsHover, setOnEsHover] = useState("");
  return (
    <Container>
      <header style={{ width: "100%", display: "inline-block" }}>
        <Stack direction={"row"}>
          <Box width={"50%"}>
            <Typography variant={"h2"}>COMPOSERS</Typography>
          </Box>
          <Box width={"50%"}>
            <Typography variant={"h2"}>PERFORMERS</Typography>
          </Box>
        </Stack>
      </header>
      <Stack direction={"row"}>
        <Box
          onMouseOver={() => setOnEsHover("composers")}
          onMouseLeave={() => setOnEsHover("")}
          style={{
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
            backgroundImage:
              'url("http://pc-nou/imatges/ComposersCollage.jpg")',
            ...style,
          }}
          onClick={() => {
            navigate("/Composers");
          }}
        ></Box>
        <Box
          onMouseOver={() => setOnEsHover("performers")}
          onMouseLeave={() => setOnEsHover("")}
          style={{
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
            backgroundImage:
              'url("http://pc-nou/imatges/PerformersCollage.jpg")',
            ...style,
          }}
          onClick={() => {
            navigate("/Performers");
          }}
        ></Box>
      </Stack>
    </Container>
  );
};

export default MenuComposerOrPerformers;
