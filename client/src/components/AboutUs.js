import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CallSplitIcon from '@material-ui/icons/CallSplit';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import people from "../icons/whoAreYou.png"
const useStyles = makeStyles({
  root: {
    minWidth: 270,
    backgroundColor: "rgba(255, 255, 255,0.2)"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});
export default function ContantUsForm() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>

        <Typography
          variant="body2"
          component="p"
          style={{ fontFamily: "Cursive", textAlign: 'center' }}>
          <img src={people} width="40" height="40"></img>
          <p style={{ fontFamily: "Cursive", fontWeight: 'bold', textAlign: 'center', fontSize: 24 }}> Who we are?</p>
          <p>Bracha Assulin and Oshrit Vidal, developers and owners of an innovative startup for purchasing courses online.
          </p><br />
          <CallSplitIcon style={{ fontSize: 40 }} />
          <p style={{ fontFamily: "Cursive", fontWeight: 'bold', textAlign: 'center', fontSize: 24 }}>How it all began?
          </p>
          <p> Following the corona crisis, we saw that there is a lot of time we are at home, and to take advantage of this time we thought of a way to acquire knowledge easily and without having to leave the house.
         </p> <br />
          <HelpOutlineIcon style={{ fontSize: 40 }} />
          <p style={{ fontFamily: "Cursive", fontWeight: 'bold', textAlign: 'center', fontSize: 24 }}>How It Works?
        </p>
          <p> Register for the site, choose courses you are impressed with, pay, get course permissions, and get started!
        </p>
          <br />
          <ThumbUpIcon style={{ fontSize: 40 }} />
          <p style={{ fontFamily: "Cursive", fontWeight: 'bold', textAlign: 'center', fontSize: 24 }}>The vision
        </p>
          <p>Knowledge equals power
        </p>
        </Typography>
        <br />

        <Typography
          variant="body2"
          component="p"
          style={{ fontFamily: "Cursive" }}>
        </Typography>
      </CardContent>
    </Card>
  );
}
