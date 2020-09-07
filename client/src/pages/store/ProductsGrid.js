import React, { useContext } from "react";
import ProductItem from "./ProductItem";
import { ProductsContext } from "../../contexts/ProductsContext";
//import styles from './ProductsGrid.module.scss';
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));

const ProductsGrid = () => {
  const classes = useStyles();

  const { products } = useContext(ProductsContext);

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Container className={classes.cardGrid} >
          {/* End hero unit */}

          <Grid container spacing={4}>
            {products.map((product, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <ProductItem key={index} product={product} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
     
      {/* End footer */}
    </React.Fragment>
  );
};

export default ProductsGrid;
