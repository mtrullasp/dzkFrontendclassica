import React, { useState } from "react";
import { usePerformersStore } from "../../index";
import {
  Box,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Observer } from "mobx-react";

const Rols = () => {
  const store = usePerformersStore();
  const navigate = useNavigate();
  let lastCategory = "";
  let lastFamily = "";

  const [idHover, setIdHover] = useState(-1);

  return (
    <Observer>
      {() => (
        <ImageList variant={"quilted"} cols={5} rowHeight={300}>
          {store?.rols?.map((p) => {
            return (
              <ImageListItem
                onMouseEnter={() => {
                  setIdHover(p.id);
                }}
                onMouseLeave={() => {
                  setIdHover(-1);
                }}
                key={p.urlImage}
                onClick={() => {
                  store.setActiveRolById(p.id);
                  navigate("/Performers/" + p.id);
                }}
              >
                <img src={p.urlImage} loading={"lazy"} />
                {idHover === p.id && (
                  <ImageListItemBar
                    position={"top"}
                    title={p.name}
                    style={{
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  />
                )}
                {idHover !== p.id && (
                  <ImageListItemBar
                    position={"bottom"}
                    title={p.name}
                    style={{
                      fontWeight: "normal",
                    }}
                  />
                )}
              </ImageListItem>
            );
          })}
        </ImageList>
      )}
    </Observer>
  );
};

export default Rols;
