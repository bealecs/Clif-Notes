"use client";
import { useEffect, useState } from "react";
import FetchLocation from "./FetchLocation";
import MapComponent from "./MapComponent";
import UpdateLocation from "./UpdateLocation";

export default function GeoLocationComponent() {
  const [coordinates, setCoordinates] = useState([]);
  const [mapUpdater, setMapUpdater] = useState<number>(0);

  useEffect(() => {
    FetchLocation().then((coordinates) => {
      if (coordinates) {
        setCoordinates([coordinates[0], coordinates[1]]);
      } else {
        setCoordinates([]);
      }
    });
  }, [mapUpdater]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          UpdateLocation(latitude, longitude);
          setMapUpdater((prev) => prev + 1);
          alert("Your new location has been posted");
        },
        (error) => {
          console.error(error);
          // Handle error
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      // Handle unsupported browser
    }
  };

  return (
    <div className="my-5 flex border-solid border-2 border-white rounded p-5">
      <div className="flex flex-col">
        <h4 className="text-xl">My Current Location</h4>
        {coordinates ? <MapComponent coordinates={coordinates} /> : <p>There is no current geolocation for this profile.</p>}
        <button
          onClick={getLocation}
          className="border-2 border-white rounded p-2 my-5"
        >
          Push Current Location
        </button>
      </div>
    </div>
  );
}
