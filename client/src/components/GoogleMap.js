import React, { Component } from 'react';
import { Map } from 'google-maps-react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import Card from '@material-ui/core/Card';
import CardContent from "@material-ui/core/CardContent";


const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
  };

  render() {
    return (

      < Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{ lat: 31.771959, lng: 35.217018 }
        }
        style={{ width: '1200px', height: '500px' }}
      >
        <Marker
          onClick={this.onMarkerClick}
          name={'CourseLine Office'}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map >

    );
  }
}




export default GoogleApiWrapper({
  apiKey: 'AIzaSyDmBDqHP47npcRvkhBzoGl-H4UMTJPmOsY'
})(MapContainer);