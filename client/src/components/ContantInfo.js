import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PhoneIcon from "@material-ui/icons/Phone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import IconButton from "@material-ui/core/IconButton";

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

export default function OutlinedCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          variant="h5"
          component="h2"
          style={{ textAlign: 'center', fontFamily: "Cursive" }}
        >
          Contant Information
          <br />
          <br />
        </Typography>
        <Typography
          variant="body2"
          component="p"
          style={{ textAlign: 'center', fontFamily: "Cursive" }}
        >
          <IconButton>
            <PhoneIcon />
          </IconButton>
          Tel: 077-2080060
          <br />
          <br />
        </Typography>
        <Typography
          variant="body2"
          component="p"
          style={{ textAlign: 'center', fontFamily: "Cursive" }}
        >
          <IconButton>
            <MailOutlineIcon />
          </IconButton>
          Email: C-Line@courses.co.il
          <br />
        </Typography>
      </CardContent>
      {/*<CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>*/}
    </Card>
  );
}
