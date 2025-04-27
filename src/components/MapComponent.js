import React from "react";
import { Map } from "@vis.gl/react-google-maps";
import MapContent from "./MapContent";

function MapComponent() {
  return (
    <div>
      <Map
        style={{ width: "100vw", height: "100vh" }}
        defaultCenter={{ lat: 35.7107, lng: 139.7735 }}
        defaultZoom={15}
        gestureHandling={"auto"}
        disableDefaultUI={true}
        mapId={"46f1e69d2b901721"}
      />
      <MapContent />
    </div>
  );
}

export default MapComponent;
