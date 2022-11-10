import React from "react";
import { IComposer } from "../../interfaces";
import { Observer } from "mobx-react";
import ImageComposerOne from "../../ImageComposerOne";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import parse from "html-react-parser";
import HyperText from "../../HyperText";
import BigText from "../../BigText";
import ComposerOneTemplate from "./ComposerOneTemplate";
import { useNavigate, useParams } from "react-router-dom";
import { IWork, WorksStore } from "../../stores/worksStore";
import AlbumsStore from "../../AlbumsStore";
import { useComposerstore } from "../../index";

const FONT_SIZE = 14;

interface IParams {
  idMN: string;
}

export interface ComposerOneProps {}

const ComposerOneWorks = (props: ComposerOneProps) => {
  const store = useComposerstore();
  const navigate = useNavigate();
  const { idMN } = useParams();
  store.setActiveComposerByIdMN(idMN);
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <Observer>
      {() => (
        <ComposerOneTemplate
          title={"Obres"}
          content={
            <div style={{ height: "100%" }}>
              {/*
              <TableContainer
                component={Paper}
                sx={{ maxHeight: 700, backgroundColor: "transparent" }}
                style={{
                  cursor: "pointer",
                  width: "100%",
                  overflowY: "hidden",
                }}
              >
*/}
              <Table
                size="small"
                style={{ width: "auto", tableLayout: "auto" }}
                stickyHeader
                aria-label="sticky table"
                sx={{ minWidth: "100%" }}
                cellSpacing="0"
              >
                <TableHead style={{ position: "sticky" }}>
                  <TableRow style={{ opacity: 0.5 }}>
                    <TableCell>Edat</TableCell>
                    <TableCell style={{ width: "100%" }}>Nom obra</TableCell>
                    <TableCell
                      onClick={() => {
                        store.ToggleWorksSort("performancesCount");
                      }}
                    >
                      #Albums
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        store.ToggleWorksSort("performancesCountReal");
                      }}
                    >
                      #Real
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{ overflowY: "hidden", height: "100%" }}>
                  {store.works.map((w: IWork, i: number) => {
                    return (
                      <TableRow
                        onClick={() => {
                          // props.albumsStore.getAlbumsByWork(w.idWork);
                          const url =
                            "/ComposerOne/" +
                            store.composerAct.idMN +
                            "/Works/" +
                            w.idWork +
                            "/Albums";
                          navigate(url);
                        }}
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                            cursor: "pointer",
                          },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          align="right"
                          style={{
                            cursor: "pointer",
                            fontSize: FONT_SIZE,
                            width: "5%",
                          }}
                        >
                          {w.atAgeOf}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            cursor: "pointer",
                            fontSize: FONT_SIZE,
                            width: "90%",
                          }}
                        >
                          {w.nameWork}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="right"
                          style={{
                            cursor: "pointer",
                            fontSize: FONT_SIZE,
                            width: "5%",
                          }}
                        >
                          {w.performancesCount}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="right"
                          style={{
                            cursor: "pointer",
                            fontSize: FONT_SIZE,
                            width: "5%",
                          }}
                        >
                          {w.performancesCountReal}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              {/*
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={store.works.length}
                  rowsPerPage={25}
                  page={1}
                  onPageChange={() => {}}
                />
              </TableContainer>
*/}
            </div>
          }
        />
      )}
    </Observer>
  );
};

export default ComposerOneWorks;
