import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import SendIcon from '@material-ui/icons/Send';

import ContantInfo from "./ContantInfo"

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  card: {
    backgroundColor: "rgba(255, 255, 255,0.2)"
  }
}));

export default function ContantUsForm() {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8} lg={9}>
        <Card variant="outlined" className={classes.card}>
          <Container component="main" maxWidth="s">
            <CssBaseline />
            <div className={classes.paper}>
              <Typography
                component="h1"
                variant="h5"
                style={{ textAlign: 'center', fontFamily: "Cursive" }}
              >
                Contant Us
          </Typography>
              <br />
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="name"
                      name="Name"
                      variant="outlined"
                      required
                      fullWidth
                      id="Name"
                      label="Name"
                      style={{ marginLeft: "290px", width: "300px" }}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      style={{ marginLeft: "290px", width: "300px" }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      multiline
                      rows={8}
                      name="WriteToUs"
                      label="Write To Us"
                      id="WriteToUs"
                      style={{ marginLeft: "290px", width: "300px" }}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{
                    marginLeft: "290px",
                    width: "300px",
                    fontFamily: "Cursive",
                    borderRadius: "6px",
                    background: "rgba(204, 230, 255,0.3)",
                    color: "black"
                  }}
                  className={classes.submit}
                >
                  Send
              <br />
                  <SendIcon />
                </Button>
              </form>
            </div>
          </Container>
        </Card>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <ContantInfo />
      </Grid>
    </Grid>
  );
}
