import * as React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MarketIcon from "@material-ui/icons/Storefront";
import ProfileIcon from "@material-ui/icons/AccountCircle";
import BranchesIcon from "@material-ui/icons/Place";
import AboutUsIcon from "@material-ui/icons/Info";
import ContactUsIcon from "@material-ui/icons/ContactSupport";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PeopleIcon from '@material-ui/icons/People';
import $ from "jquery";
import ComputerIcon from '@material-ui/icons/Computer';

/*const CustomLink =()=> (
  sessionStorage.getItem("userEmail")?href="/"+sessionStorage.getItem("userEmail"):null;
);*/
/*function GetAllUsers() {
  $.ajax({
    type: "GET",
    url: "/usersTable"
  }).done(function (data) {
    console.log("Users: " + data);
    // handleClose();
    //window.location.href = "/";
    //sessionStorage.setItem("userEmail", email);
  })
    .fail(function (jqXhr) {
      alert("Try again!!");
    });

}*/

const styles = theme => ({
  listItemText: {
    fontFamily: 'Cursive',//Insert your required size
  }
});
var userName = sessionStorage.getItem("userEmail");
var userPermission = sessionStorage.getItem("userPermission");
console.log("userName in listItems " + userName);
const mainListItems = (
  <div>
    <ListItem button component="a" href="/" >
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" classes={{ primary: styles.listItemText }} />
    </ListItem>
    {/*} <ListItem button component="a" href="/SignIn">
      <ListItemIcon>
        <ProfileIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
</ListItem>*/}
    <ListItem button component="a" {...userName !== "null" ? { href: "/Market/" + userName } : { href: "/SignIn/" }}>
      <ListItemIcon>
        <MarketIcon />
      </ListItemIcon>
      <ListItemText primary="Market" classes={{ fontFamily: 'Cursive' }} />
    </ListItem>
    <ListItem button component="a" {...userName !== "null" ? { href: "/SavedItems/" + userName } : { href: "/SignIn/" }}>
      <ListItemIcon>
        <FavoriteIcon />
      </ListItemIcon>
      <ListItemText primary="Saved Items" style={{ fontFamily: 'Cursive' }} />
    </ListItem>
    {userPermission === "manager" && <ListItem button component="a" {...userName !== "null" ? { href: "/Users/" + userName } : { href: "/Users/" }}> {/*onClick={GetAllUsers}*/}
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" style={{ fontFamily: 'Cursive' }} />
    </ListItem>}
    {(userPermission === "manager" || userPermission === "employee") && <ListItem button component="a" {...userName ? { href: "/Courses/" + userName } : { href: "/Courses" }}> {/*onClick={GetAllUsers}*/}
      <ListItemIcon>
        <ComputerIcon />
      </ListItemIcon>
      <ListItemText primary="Courses" style={{ fontFamily: 'Cursive' }} />
    </ListItem>}

    <ListItem button component="a" href="/GoogleMaps" {...userName !== "null" ? { href: "/GoogleMaps/" + userName } : { href: "/GoogleMaps/" }}>
      <ListItemIcon>
        <BranchesIcon />
      </ListItemIcon>
      <ListItemText primary="Branches" style={{ fontFamily: 'Cursive' }} />
    </ListItem>
    <ListItem button component="a" href="/AboutUs" {...userName !== "null" ? { href: "/AboutUs/" + userName } : { href: "/AboutUs/" }}>
      <ListItemIcon>
        <AboutUsIcon />
      </ListItemIcon>
      <ListItemText primary="About Us" />
    </ListItem>
    <ListItem button component="a" href="/ContactUs" {...userName !== "null" ? { href: "/ContactUs/" + userName } : { href: "/ContactUs/" }}>
      <ListItemIcon>
        <ContactUsIcon />
      </ListItemIcon>
      <ListItemText primary="Contact Us" style={{ fontFamily: 'Cursive' }} />
    </ListItem>
  </div>

);
export default mainListItems;
