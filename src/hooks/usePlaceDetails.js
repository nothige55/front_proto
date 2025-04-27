import { useMapsLibrary } from "@vis.gl/react-google-maps";

export function usePlaceDetails() {
  const placeLib = useMapsLibrary("places");

  const getPlaceDetails = async (placeId) => {
    if (!placeLib) return;

    try {
      const place = new placeLib.Place({ id: placeId });
      await place.fetchFields({
        fields: [
          "displayName",
          "formattedAddress",
          "photos",
          "rating",
          "types",
        ],
      });
      console.log(place.displayName);
      return place; // 필요하면 place 리턴
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  return { getPlaceDetails };
}

export default usePlaceDetails;
