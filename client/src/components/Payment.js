import PaymentCard from 'react-payment-card-component'
import React from 'react';
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import { useAlert } from 'react-alert';

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
        marginLeft: theme.spacing(35),
    }
}));


export default function Payment() {
    const classes = useStyles();
    const [state, setState] = React.useState(false);

    const alert = useAlert()


    const {
        wrapperProps,
        getCardImageProps,
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps
    } = usePaymentInputs();

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

    return (
        <Card variant="outlined" style={{ marginLeft: '40%', marginRight: '40%' }}>
            <form className={classes.form} noValidate>

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="TotalPayment"
                    label="Total payment"
                    name="total"
                    autoFocus>

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
                        id="password"
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

                <PaymentInputsWrapper {...wrapperProps} style={{ width: '350px' }}>
                    <svg {...getCardImageProps({ images })} />
                    <input {...getCardNumberProps()} onFocus={onNumberHandle} />
                    <input {...getExpiryDateProps()} onFocus={onNumberHandle} />
                    <input {...getCVCProps()} onFocus={ChangeCvvHandle} />
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

        </Card>
    );
}
