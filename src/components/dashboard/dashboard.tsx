"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Toolbar,
  Typography,
  Paper,
} from "@mui/material";
import { AlbumList } from "../album-list.component";
import { AlbumInfos } from "../../interfaces/album-infos.interface";
import { ListInfos } from "../../interfaces/list-infos.interface";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#9c27b0",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "linear-gradient(90deg, #9c27b0 0%, #f50057 100%)",
          boxShadow: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
          transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
          "&:hover": {
            boxShadow:
              "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
          },
        },
      },
    },
  },
});

export default function Dashboard() {
  const [selectedList, setSelectedList] = useState<number>(0);
  const [lists, setLists] = useState<ListInfos[]>([]);
  const [items, setItems] = useState<AlbumInfos[]>([]);
  useEffect(() => {
    getLists().then(() => {
      setItems(lists[0].items);
    });
  }, []);

  const getLists = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:8080/v1/api/lists", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    response.json().then((listsResponse) => {
      listsResponse.sort((a: ListInfos, b: ListInfos) => a.id - b.id);
      setLists(listsResponse);
      setSelectedList(listsResponse[0].id);
      const itemsSorted = listsResponse[0].items.sort(
        (a: AlbumInfos, b: AlbumInfos) => a.position - b.position
      );
      setItems(itemsSorted);
    });
  };

  const handleChange = (event: SelectChangeEvent<number>) => {
    setSelectedList(event.target.value as number);
    setItems(lists.find((list) => list.id === event.target.value)?.items ?? []);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "white" }}
            >
              Modern Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
            bgcolor: "background.paper",
          }}
        >
          {lists?.length > 0 && (
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="item-select-label">Select Item</InputLabel>
              <Select
                labelId="item-select-label"
                id="item-select"
                value={selectedList}
                label="Select Item"
                onChange={handleChange}
                size="small"
              >
                {lists?.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              {lists?.find((item) => item.id === selectedList)?.title}
            </Typography>
            <Typography variant="body1">
              {items.length > 0 && (
                <AlbumList items={items} setItems={setItems} />
              )}
            </Typography>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
