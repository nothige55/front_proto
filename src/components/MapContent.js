import { useEffect } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

function MapContent() {
  const map = useMap();
  const placeLib = useMapsLibrary("places");

  useEffect(() => {
    if (!map) return;

    const getPlaceDetails = async (placeId) => {
      try {
        const place = new placeLib.Place({
          id: placeId,
        });
        await place.fetchFields({
          fields: [
            "displayName",
            "formattedAddress",
            //"opening_hours", Place.regularOpeningHours 사용
            "photos",
            "rating",
            "types",
          ],
        });
        console.log(place.displayName);
      } catch (error) {
        console.error("Error fetching place details:", error);
      }
    };

    const poiClickListener = map.addListener("click", (e) => {
      if (e.placeId) {
        console.log("POI clicked:", e.placeId);
        getPlaceDetails(e.placeId);
      } else {
        console.log("Map clicked, no POI.");
      }
    });

    return () => {
      poiClickListener.remove();
    };
  }, [map, placeLib]);
}

export default MapContent;
