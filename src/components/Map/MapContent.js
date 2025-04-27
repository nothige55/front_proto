import { useEffect } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import POIClickListener from "../../utils/POIClickListener"; // POI 클릭 리스너

function MapContent() {
  const map = useMap(); // google.maps.importLibrary("maps")와 동일
  const placeLib = useMapsLibrary("places"); // google.maps.importLibrary("places")와 동일

  useEffect(() => {
    if (!map) return;

    const { poiClickListener } = POIClickListener(map); //POIClickListener.js에서 가져온 클릭 리스너

    return () => {
      if (poiClickListener) {
        poiClickListener.remove();
      } //컴포넌트가 언마운트 되거나 useEffect가 다시 실행될 때마다 리스너를 제거
    };
  }, [map, placeLib]);
}

export default MapContent;
