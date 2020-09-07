import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import $ from "jquery";


const useStyles = makeStyles(theme => ({
  root1: {
    height: "100vh",
    width: "230vh"
  },
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    //margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
export default function FormDialog() {
  const [open, setOpen] = React.useState(true);
  const [incorrectEmail, setIncorrectEmail] = React.useState(false);
  const [incorrectPassword, setIncorrectPassword] = React.useState(false);
  const [emptyFirstName, setEmptyFirstName] = React.useState(false);
  const [emptyLastName, setEmptyLastName] = React.useState(false);
  const classes = useStyles();

  const handleSignUp = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(data.get('firstName'));
    let jsonData = {
      "name": data.get('firstName') + " " + data.get('lastName'),
      "email": data.get('email'),
      "password": data.get('password'),
      "type": "customer"

    }
    $.ajax({
      type: "POST",
      url: "/AddUser",
      data: jsonData
    })
      .done(function (data1) {
        console.log("done done!!");
        handleClose();
        sessionStorage.setItem("userEmail", data.get('email'));
        sessionStorage.setItem("name", data.get('firstName') + " " + data.get('lastName'));
        sessionStorage.setItem("userPermission", "customer");
        localStorage.setItem("cart", JSON.stringify([]));
        setIncorrectEmail(false);
        setIncorrectPassword(false);
        window.location.href = "/";


        //sessionStorage.setItem("userEmail", email);
      })
      .fail(function (jqXhr) {
        alert("Try again!!");
      });

  }
  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const PasswordChanged = (event) => {
    if (event.target.value !== '') {
      setIncorrectPassword(false);
    }
    else {
      setIncorrectPassword(true);

    }
  }
  const FirstNameChanged = (event) => {
    if (event.target.value !== '') {
      setEmptyFirstName(false);
    }
    else {
      setEmptyFirstName(true);

    }
  }
  const LastNameChanged = (event) => {
    if (event.target.value !== '') {
      setEmptyLastName(false);
    }
    else {
      setEmptyLastName(true);

    }
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

  return (
    <div>
      <Dialog open={open} onClose={handleClose} className={classes.root1} maxWidth='md'>
        <DialogActions className={classes.DialogAction}>
          <IconButton component="a" href="/" onClick={handleClose} color="primary" >
            <CloseIcon />
          </IconButton>
        </DialogActions>
        <DialogContent>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
        </Typography>
              <form className={classes.form} onSubmit={handleSignUp} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      onChange={FirstNameChanged}
                      error={emptyFirstName}
                      helperText={emptyFirstName ? 'First name should not be empty!' : ' '}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                      onChange={LastNameChanged}
                      error={emptyLastName}
                      helperText={emptyLastName ? 'Last name should not be empty!' : ' '}
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
                      onChange={ValidateEmail}
                      error={incorrectEmail}
                      helperText={incorrectEmail ? 'Incorrect Email!' : ' '}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={PasswordChanged}
                      error={incorrectPassword}
                      helperText={incorrectPassword ? 'Password should not be empty!' : ' '}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="primary" />}
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                <Grid container >
                  <Grid item>
                    <Link component="a" href="/SignIn">
                      Already have an account? Sign in
              </Link>
                  </Grid>
                </Grid>
              </form>
            </div>

          </Container>
        </DialogContent>

      </Dialog>
    </div>
  );
}
