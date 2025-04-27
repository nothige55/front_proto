import { useEffect } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import POIClickListener from "./POIClickListener";

function MapContent() {
  const map = useMap();
  const placeLib = useMapsLibrary("places");

  useEffect(() => {
    if (!map) return;

    const { poiClickListener } = POIClickListener(map);

    return () => {
      if (poiClickListener) {
        poiClickListener.remove();
      }
    };
  }, [map, placeLib]);
}

export default MapContent;
