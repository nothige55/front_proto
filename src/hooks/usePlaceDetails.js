import { useCallback } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

export function usePlaceDetails() {
  const placeLib = useMapsLibrary("places");

  const getPlaceDetails = useCallback(
    async (placeId) => {
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
        //console.log(place.photos[0].getURI());
        console.log("fetchFields used"); //많이 호출되면 비용 많이 나감 체크할것
        return place; // 필요하면 place 리턴
      } catch (error) {
        console.error("Error fetching place details:", error);
      }
    },
    [placeLib] // placeLib가 변경될 때만 새로 생성
  );

  return { getPlaceDetails };
}

export default usePlaceDetails;

//useCallback 사용해서 반복호출문제 해결 왜 그런건지 공부 좀
