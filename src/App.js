import React, { useState, useEffect } from "react";
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, {
  NavigationControl,
  GeolocateControl,
  FullscreenControl,
  ScaleControl,
} from "react-map-gl";
import { mapboxStyle, mapboxglAccessToken } from "./utils/consts";
import Leftmenus from "./components/Leftmenus";

function App() {
  const [viewState, setViewState] = useState({
    longitude: 72.52783064016589,
    latitude: 23.03354684389069,
    zoom: 17,
  });

  

  return (
    <div className="w-full h-full ">
      <Leftmenus />
      <Map
        attributionControl={false}
        mapboxAccessToken={mapboxglAccessToken}
        style={{
          width: "100vw",
          height: "100vh",
        }}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle={mapboxStyle}
      >
        <NavigationControl />
        <GeolocateControl />
        <FullscreenControl />
        <ScaleControl />
      </Map>

      <button className=" z-10 absolute bottom-4 right-2 bg-white px-2 rounded-sm hover:bg-slate-300">
        Reset
      </button>
      <button className=" z-10 absolute bottom-12 right-2 bg-white px-2 rounded-sm hover:bg-slate-300">
        GetSoldArea
      </button>
      <button className=" z-10 absolute bottom-20 right-2 bg-white px-2 rounded-sm hover:bg-slate-300">
        SaveToSoldArea
      </button>
      <button className=" z-10 absolute bottom-28 right-2 bg-white px-2 rounded-sm hover:bg-slate-300">
        Delete
      </button>
      <button className=" z-10 absolute bottom-36 right-2 bg-white px-2 rounded-sm hover:bg-slate-300">
        Check
      </button>
      <button className="z-10 absolute bottom-44 bg-white px-2 rounded-sm right-2  ">
        Sample
      </button>
    </div>
  );
}

export default App;
