import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Container,
  CssBaseline,
  Box,
  Avatar,
  Link,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9c27b0", // Purple
    },
    secondary: {
      main: "#e91e63", // Pink
    },
  },
});

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const signupDatas = {
      username,
      password,
    };
    event.preventDefault();
    const response = await fetch("http://localhost:8080/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupDatas),
    });
    if (!response.ok) {
      setErrorMessage("Nom de compte ou mot de passe incorrect");
      setOpenError(true);
    } else {
      response.json().then((loginResponse) => {
        localStorage.setItem("token", loginResponse.accessToken);
        navigate("/tierlist");
      });
    }
  };

  const handleCloseError = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Connexion
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nom de compte"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                background: "linear-gradient(45deg, #9c27b0 30%, #e91e63 90%)",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #8e24aa 30%, #d81b60 90%)",
                },
              }}
            >
              Se connecter
            </Button>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  onClick={handleRegister}
                  sx={{
                    mt: 2,
                    mb: 2,
                    borderWidth: 2,
                    "&:hover": {
                      borderWidth: 2,
                    },
                  }}
                >
                  S'inscrire
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Link
                  href="#"
                  variant="body2"
                  sx={{ display: "block", textAlign: "center" }}
                >
                  Mot de passe oublié ?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Snackbar
          open={openError}
          autoHideDuration={6000}
          onClose={handleCloseError}
        >
          <Alert
            onClose={handleCloseError}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}
