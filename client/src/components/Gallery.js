import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';

import AwesomeSlider from 'react-awesome-slider';
import AwesomeSliderStyles from 'react-awesome-slider/src/styles';
import 'react-slideshow-image/dist/styles.css'

const useStyles = makeStyles({
    root: {
        minWidth: 500,
        heigth: 500,
        backgroundColor: "rgba(255, 255, 255,0.2)"

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
    eachSlide: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        height: '350px'
    }


});

export default function OutlinedCard() {
    const classes = useStyles();
    return (
        <Card style={{ backgroundColor: "rgba(255,255,255,0.3)", width: "100%", height: '450px' }}>
            <AwesomeSlider cssModule={AwesomeSliderStyles} style={{ height: '450px' }}>
                <div >
                    <img width="100%" height="100%" src="./images/gallery2.png"></img>
                </div>
                <div  >
                    <img width="100%" height="100%" src="./images/gallery1.png"></img>
                </div>

            </AwesomeSlider>
        </Card>
    );
}