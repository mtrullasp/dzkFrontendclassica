import { Box, Container, Stack } from "@mui/material";
import React from "react";

export interface IItemMenuScreenProps {
  urlImage: string;
  nom: string;
  url: string;
  childs: IItemMenuScreenProps[];
}

export interface IMenuScreenProps {
  items: Array<IItemMenuScreenProps>;
}

const MenuScreen = (props: IMenuScreenProps) => {
  return (
    <Container>
      <Stack direction={"row"} alignItems={"center"}>
        {props.items.map((i) => {
          return (
            <Box
              onClick={() => {
                if (!!i.childs) {
                  console.log("Go Childs");
                }
              }}
            >
              {i.nom}
            </Box>
          );
        })}
      </Stack>
    </Container>
  );
};
