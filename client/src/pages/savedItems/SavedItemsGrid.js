import React, { useContext } from "react";
import Product from "../store/ProductItem";
import { ProductsContext } from "../../contexts/ProductsContext";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
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
            {products
              .filter(product => product.saved === true) //just the saved items
              .map((product, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Product key={index} product={product} />
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
