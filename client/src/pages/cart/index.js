import React, { useContext } from "react";

import CartProducts from "./CartProducts";
import { CartContext } from "../../contexts/CartContext";
import { formatNumber } from "../../helpers/utils";
import { Link } from "react-router-dom";

import PaymentCard from 'react-payment-card-component'
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Alert from 'react-bootstrap/Alert'
import Dialog from '@material-ui/core/Dialog';



const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 270,
    backgroundColor: "rgb(255, 230, 230)"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  form: {
    width: "53%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(20),
  }
}));

const Cart = () => {
  const {
    total,
    cartItems,
    itemCount,
    clearCart,
    checkout,
    handleCheckout
  } = useContext(CartContext);

  const userName = sessionStorage.getItem("userEmail");

  const classes = useStyles();
  const [state, setState] = React.useState(false);
  const [totalPay, setTotalPay] = React.useState(total);
  const [showAlertSuccess, setShowAlertSuccess] = React.useState(false);
  const [showAlertDanger, setShowAlertDanger] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDialog2, setOpenDialog2] = React.useState(false);

  const cardNumberValidator = ({ cardNumber, cardType, errorMessages }) => {
    // if (cardType.displayName === 'Visa' || cardType.displayName === 'Mastercard') {
    console.log("I am in card validator!!");
    return;
    //}
    //return 'Card must be Visa or Mastercard';
  }

  const expiryDateValidator = ({ expiryDate, errorMessages }) => {
    console.log("I am in expiry Date Validator!!");
    return;
  }
  const onError = (error, erroredInputs) => {
    console.log("I am in onError");
  }

  const beforeCheckout = () => {
    setTotalPay(total);
    handleCheckout();
  }

  const {
    wrapperProps,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,

  } = usePaymentInputs({ cardNumberValidator, onError, expiryDateValidator });



  const flipCard = () => {
    const flipped = !state
    setState({ flipped })
  }
  const ChangeCvvHandle = () => {
    flipCard();
  }
  const onNumberHandle = () => {
    setState(false);
  }
  const handleCloseDialog = () => {
    window.location = "/";

    setOpenDialog(false);

  };
  const handleCloseDialog2 = () => {
    window.location = "/";
    setOpenDialog2(false);

  };
  const sendEmail = (event) => {
    event.preventDefault();
    let data = new FormData(event.target);
    fetch('/sendEmail', {
      method: "POST",
      body: JSON.stringify({ "name": data.get('name'), "email": data.get('email'), "message": "Thank you for purchasing from CourseLine, hope you learn and succeed :)" }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(
      (response) => (response.json())
    ).then((response) => {
      if (response.status === 'success') {
        //alert("Message Sent to your email.");
        setOpenDialog(true);
        setShowAlertSuccess(true);
        document.getElementById("paymentForm").reset();

      } else if (response.status === 'fail') {
        //alert("Message failed to send.")
        setShowAlertDanger(true);
        setOpenDialog2(true);

      }
    })
  }
  return (
    <div style={{ width: "100%" }}>
      {showAlertSuccess && <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth='s'><Alert variant="success" onClose={() => { setShowAlertSuccess(false); window.location = '/'; }} dismissible>
        <Alert.Heading>Thank You</Alert.Heading>
        <p>We sent to an amail with the details of the course</p>
      </Alert></Dialog>}
      {showAlertDanger && <Dialog open={openDialog2} onClose={handleCloseDialog2} maxWidth='s'><Alert variant="danger" onClose={() => { setShowAlertDanger(false); window.location = '/'; }} dismissible>
        <Alert.Heading>Error</Alert.Heading>
        <p>We are very sorry, there is a problem. Try again later</p>
      </Alert></Dialog>}
      <div className="text-center mt-5">
        <h1 style={{
          fontFamily: "Cursive",
        }}>{checkout ? "Payment" : "Cart"}
        </h1>
      </div>

      <div className="row no-gutters justify-content-center">
        <div className="col-sm-9 p-3">

          {cartItems.length > 0 && <CartProducts />}
          {/*} {cartItems.length > 0 ? (
            <CartProducts />
          ) : (
              <div className="p-3 text-center text-muted" > Your cart is empty</div>
            )}*/}

          {checkout && (<Card variant="outlined" >
            <form id="paymentForm" className={classes.form} onSubmit={sendEmail} style={{ align: 'center' }} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                defaultValue={totalPay}
                id="TotalPayment"
                label="Total payment"
                name="total"
                autoFocus
                InputProps={{
                  readOnly: true,
                }}
              >

              </TextField>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
              />
              <Tooltip title="Permission for the courses will be sent to this email" placement="right">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="email"
                  label="Email Address"
                  id="email"
                  autoComplete="email"
                />
              </Tooltip>
              <br />
              <br />

              <PaymentCard
                bank="visa"
                model="personnalite"
                type="black"
                brand="mastercard"
                number="4872689526581478"
                cvv="CVV"
                holderName="Owen Lars"
                expiration="12/20"
                flipped={state}
              />

              <br></br>
              <br></br>

              <PaymentInputsWrapper {...wrapperProps} style={{ width: '477px' }}>
                <svg {...getCardImageProps({ images })} />
                <input {...getCardNumberProps()} onFocus={onNumberHandle} style={{ width: '70%' }} />
                <input {...getExpiryDateProps()} onFocus={onNumberHandle} style={{ width: '20%' }} />
                <input {...getCVCProps()} onFocus={ChangeCvvHandle} style={{ width: '10%' }} />
              </PaymentInputsWrapper>
              <br />
              <br />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}>
                Pay
            </Button>
            </form>
            <br />
            <br />
            <br />

          </Card>
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="col-sm-3 p-3">
            <div className="card card-body">
              <p className="mb-1">Total Items</p>
              <h4 className=" mb-3 txt-right">{itemCount}</h4>
              <p className="mb-1">Total Payment</p>
              <h3 className="m-0 txt-right">{formatNumber(total)}</h3>
              <hr className="my-4" />
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-primary mb-2"
                  onClick={beforeCheckout}
                >
                  CHECKOUT
                </button>
                <button
                  type="button"
                  className="btn btn-outlineprimary btn-sm"
                  onClick={clearCart}
                >
                  CLEAR
                </button>
              </div>
            </div>

          </div>

        )}
      </div>
    </div >
  );
};

export default Cart;
