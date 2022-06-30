import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles";

const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClicked }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width: 600px)");

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDFxQKrxCb62DBdoJg7SNFh0Hd6Pbxpumg" }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={ (child) => setChildClicked(child)}
      >
        {places?.map( (place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(places.latitude)}
            lng={Number(places.longitude)}
            key={i}
          >
            {
              isDesktop ? (
                <LocationOnOutlinedIcon color="primary" fontSize="large" />
              ) : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                    {place.name}
                  </Typography>
                  <img
                    className={classes.pointer}
                    src={
                      place.photo
                        ? place.photo.images.large.url
                        : "https://img.freepik.com/free-photo/restaurant-interior_1127-3394.jpg?t=st=1655864823~exp=1655865423~hmac=c2d4da2b1f4642f5d0920bd54755734e6b27912bad625dbba0a3dfe3af7dad02&w=1060"
                    }
                    alt={place.name}
                  />
                  
                  <Rating size="small" value={Number(place.reating)} readOnly />
                </Paper>
              )
            }
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
