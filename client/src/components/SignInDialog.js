import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
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
import Paper from "@material-ui/core/Paper";
import SignUpDialog from "./SignUpDialog";
import { Route, Switch } from "react-router-dom";
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import $ from "jquery";
import { borderRadius } from '@material-ui/system';
import Container from "@material-ui/core/Container";




const useStyles = makeStyles(theme => ({
  DialogAction: {
    length: 30,
    width: 70
  },
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  googleLoginButton: {
    width: "330px",
    height: "50px"
  }
}));

export default function FormDialog() {
  const [open, setOpen] = React.useState(true);
  const [incorrectEmail, setIncorrectEmail] = React.useState(false);
  const [incorrectPassword, setIncorrectPassword] = React.useState(false);
  const classes = useStyles();

  const getPermissions = (userName) => {
    $.ajax({
      type: "POST",
      url: "/permissions",
      data: userName
    }).done(function (res1) {
      let type = res1;
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1!!!!!!!!!!!!$$$$$$$" + type);
      sessionStorage.setItem("userPermission", res1);

    })
      .fail(function (jqXhr) {
        console.log("i am in fail of permission");
      });
  }

  const handleSignIn = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    let jsonData = {
      "email": data.get('email'),
      "password1": data.get('password')
    }
    console.log(jsonData);
    $.ajax({
      type: "POST",
      url: "/Login",
      data: jsonData
    }).done(function (res) {
      console.log("done done!! " + res.user);
      if (res == "error") {
        alert("Incorrect username or password!");
        setIncorrectEmail(true);
        setIncorrectPassword(true);

      }
      else {
        let respone = JSON.parse(res);
        console.log("user permission in login is " + respone.permission);
        handleClose();
        sessionStorage.setItem("userEmail", data.get('email'));
        sessionStorage.setItem("userPermission", respone.permission);
        sessionStorage.setItem("name", respone.name);
        localStorage.setItem("cart", JSON.stringify(respone.cartItems));
        setIncorrectEmail(false);
        setIncorrectPassword(false);
        window.location.href = "/";

      }

    })
      .fail(function (jqXhr) {
        alert("Incorrect username or password!");
        setIncorrectEmail(true);
        setIncorrectPassword(true);

      });

  }

  const ValidateEmail = (event) => {
    console.log("email in onChange handler " + event.target.value);
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)) {
      setIncorrectEmail(false);
      return (true)
    }
    //alert("You have entered an invalid email address!")
    setIncorrectEmail(true);
    return (false)
  }

  const PasswordChanged = () => {
    setIncorrectPassword(false);
  }

  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const responseFacebook = (response) => {
    console.log(response);
  }

  const responseGoogle = (response) => {
    console.log(response);
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth='s'>
        <DialogActions className={classes.DialogAction}>
          <IconButton component="a" href="/" onClick={handleClose} color="primary" >
            <CloseIcon />
          </IconButton>
        </DialogActions>
        <DialogContent>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            {/*<Grid container component="main" className={classes.root} maxWidth='xs'>*/}
            {/*<Grid item xs={12} sm={8} md={5} component={Paper} elevation={8} square>*/}
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" style={{ fontFamily: "Cursive" }}>
                Sign in
          </Typography>
              <form className={classes.form} onSubmit={handleSignIn} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={ValidateEmail}
                  error={incorrectEmail}
                  style={{ fontFamily: "Cursive" }}
                  helperText={incorrectEmail ? 'Incorrect Email!' : ' '} />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={PasswordChanged}
                  error={incorrectPassword}
                  style={{ fontFamily: "Cursive" }}
                  helperText={incorrectPassword ? 'Incorrect Password!' : ' '}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{ fontFamily: "Cursive", borderRadius: "3px" }}
                  className={classes.submit}>
                  Sign In

                  </Button>
                <FacebookLogin
                  appId="943313892847322" //APP ID NOT CREATED YET
                  fields="name,email,picture"
                  callback={responseFacebook}
                  buttonStyle={{ width: "330px", height: "50px", borderRadius: "5px!important" }}
                  icon="fa-facebook"

                />
                <br />
                <br />

                <GoogleLogin
                  clientId="985961471303-dd7bludfn1fq92rrgto97j2sbnvlhepr.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                  buttonText="LOGIN WITH GOOGLE"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  className={classes.googleLoginButton}
                />
                <br />
                <br />

                <Grid container>
                  <Grid item>
                    <Link component="a" href="/SignUp" >
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>

              </form>
            </div>
            {/*</Grid>*/}
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
}
