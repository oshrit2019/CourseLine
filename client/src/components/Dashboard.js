import React, { useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import CartIcon from "@material-ui/icons/ShoppingCart";
import mainListItems /*, secondaryListItems*/ from "./listItems";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";
import { Route, Switch } from "react-router-dom";
import Cart from "../pages/cart";
import HomePage from "./HomePage";
import Store from "../pages/store";
import SavedItems from "../pages/savedItems";
import { formatNumber } from "../helpers/utils";
import { CartContext } from "../contexts/CartContext";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GoogleMaps from "./GoogleMap"
import SignInDialog from "./SignInDialog";
import SignUpDialog from "./SignUpDialog";
import ContantUs from "./ContantUs";
import CallIcon from '@material-ui/icons/Call';
import AboutUs from "./AboutUs"
import { Card, Dialog, Button } from "@material-ui/core";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Popover from '@material-ui/core/Popover';
import ForumIcon from '@material-ui/icons/Forum';
import UsersTable from "./UsersTable";
import $ from "jquery";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Join from './Join/Join';
import Chat from './Chat/Chat';
import CoursesTable from "./CoursesTable";
import Gallery from './Gallery'
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  root2: {
    position: 'relative',
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  },
  floatingButton: {
    paddingBottom: theme.spacing(4)

  },
  dropdown: {
    position: 'absolute',
    top: 32,
    right: 0,
    left: 0,
    display: 'inline - block',
    zIndex: 1,
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    color: 'black'
  },
}));


//export default function Dashboard() {
const Dashboard = () => {

  const {
    total,
    cartItems,
    itemCount,
    clearCart,
    checkout,
    handleCheckout
  } = useContext(CartContext);

  const [state, setState] = React.useState({
    openPopover: false,
    anchorOriginVertical: 'top',
    anchorOriginHorizontal: 'right',
    transformOriginVertical: 'top',
    transformOriginHorizontal: 'right',
    positionTop: 300, // Just so the popover can be spotted more easily
    positionRight: 1500, // Same as above
  });


  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [dropOpen, setDropOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClick = (event) => {
    event.preventDefault();
    setDropOpen((prev) => !prev);
    console.log("the value of dropOpen is " + dropOpen);
    console.log("the userName in handleClick is " + userName);
    if (userName === "null") {
      window.location = "/SignIn/";

    }
    /* else {
       window.location = "/";
     }*/
  };

  const handleClickAway = () => {
    setDropOpen(false);
  };

  const SignOutClicked = () => {
    sessionStorage.setItem("userEmail", null);
    sessionStorage.setItem("userPermission", null);
    localStorage.setItem("cart", "[]");
    setDropOpen(false);
    window.location = "/";


  }
  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };
  const {
    openPopover,
    anchorOriginVertical,
    anchorOriginHorizontal,
    transformOriginVertical,
    transformOriginHorizontal,
    positionTop,
    positionLeft,
  } = state;


  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  //sessionStorage.setItem("userEmail", null);////?????????
  //console.log("session set to null");
  var userName = sessionStorage.getItem("userEmail");
  var name = sessionStorage.getItem("name");

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
        style={{ background: 'rgb(0, 153, 153)', fontFamily: 'Cursive' }}

      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
            style={{ fontFamily: 'Cursive', fontSize: '24' }}

          >
            CourseLine
          </Typography>
          <IconButton color="inherit" component="a" {...userName !== "null" ? { href: "/Join/" + userName } : { href: "/Join/" }}>
            <ForumIcon />
          </IconButton>
          <ClickAwayListener onClickAway={handleClickAway}>
            <div className={classes.root2}>
              <IconButton color="inherit" component="a" {...userName !== "null" ? { href: "/SignOut/" + userName } : { href: "/SignIn/" }} onClick={handleClick}>
                <AccountCircleIcon />
              </IconButton>
            </div>
          </ClickAwayListener>
          <IconButton color="inherit" component="a" href="/Notification">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" component="a" {...userName !== "null" ? { href: "/Cart/" + userName } : { href: "/Cart/" }}>
            <Badge
              badgeContent={itemCount}
              color="secondary"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
            >
              <CartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      {dropOpen && userName !== "null" ? (
        <Card style={{
          Width: '80px', position: 'absolute',
          top: 65,
          right: 105,
          display: 'inline - block',
          zIndex: 40,
          border: '1px solid',
          //padding: theme.spacing(1),
          backgroundColor: 'white',
          color: 'black'
        }}>
          <p style={{ fontFamily: 'Cursive', textAlign: 'center' }}>{"Welcome"} </p>
          <p style={{ fontFamily: 'Cursive', textAlign: 'center' }}>{name} </p>
          <Link style={{ fontFamily: 'Cursive', textAlign: 'center' }} onClick={SignOutClicked} underline="always" color="inherit">Sign Out</Link>
        </Card>
      ) : null}

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>

        </div>
        <List>{mainListItems}</List>
      </Drawer>
      <Switch>
        <Route exact path="/SignIn" render={(props) => {
          // if (!userName) {
          //  console.log("User is inconnect!!");
          return <SignInDialog {...props} />
          /*}
          else {
            console.log("User is connected!!");

          }*/

        }} />
        <Route exact from="/SignUp" render={props => <SignUpDialog {...props} />} />
      </Switch>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {/*<Switch>
            <Route exact from="/Cart" render={props => <Cart {...props} />} />
            <Route exact from="/Market" render={props => <Store {...props} />} />
            <Route exact from="/SavedItems" render={props => <SavedItems {...props} />}
            />
          </Switch>*/}
          <Grid container spacing={1}>
            {/* Chart */}
            <Switch>
              <Route exact from="/ContactUs/*" render={props => <ContantUs {...props} />} />
              <Route exact from="/AboutUs/*" render={props => <AboutUs {...props} />} />
              <Route exact from="/" render={props => <Gallery {...props} />} />
              <Route exact from="/Cart/*" render={props => <Cart {...props} />} />
              <Route exact from="/Market/*" render={props => <Store {...props} />} />
              <Route exact from="/SavedItems/*" render={props => <SavedItems {...props} />} />
              <Route exact path="/chat" render={props => <Chat {...props} />} />
              <Route exact path="/Join/*" render={props => <Join {...props} />} />
              <Route exact from="/SignOut/*" render={props => <AboutUs {...props} />} />
              <Route exact from="/Users/*" render={props => <UsersTable {...props} />} />
              <Route exact from="/Courses/*" render={props => <CoursesTable {...props} />} />
              <Route exact from="/Gallery/*" render={props => <Gallery {...props} />} />
              <Route exact from="/GoogleMaps/*" render={props => <GoogleMaps {...props} />} />

            </Switch>


          </Grid>

        </Container>

        <footer>
          <Typography
            variant="h6"
            align="center"
            gutterBottom
            style={{ fontFamily: "Cursive" }}
          >
            CourseLine
      </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
            style={{ fontFamily: "Cursive" }}
          >
            © 2020 Bracha Asulin & Oshrit Vidal
      </Typography>
        </footer>
      </main>

    </div>
  );
};
export default Dashboard;
