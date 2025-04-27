import { useEffect } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import POIClickListener from "../../utils/POIClickListener";
import useStore from "../../store/store";

function MapContent() {
  const map = useMap();
  //const placeLib = useMapsLibrary("places");
  const setSelectedPlaceId = useStore((state) => state.setSelectedPlaceId);

  useEffect(() => {
    if (!map) return;

    const { listener } = POIClickListener(map, setSelectedPlaceId);

    return () => {
      if (listener) {
        listener.remove();
      }
    };
  }, [map, setSelectedPlaceId]);

  return null;
}

export default MapContent;
