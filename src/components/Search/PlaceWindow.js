import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import usePlaceDetails from "../../hooks/usePlaceDetails"; // 장소 세부정보 훅
import useStore from "../../store/store"; // Zustand 스토어

function PlaceWindow() {
  const { selectedPlaceId } = useStore(); // Zustand 스토어에서 클릭된 장소 ID 가져오기
  const { getPlaceDetails } = usePlaceDetails();
  const [place, setPlace] = useState(null); // 선택된 장소 상태

  useEffect(() => {
    if (!selectedPlaceId) return;

    const fetchPlaceDetails = async () => {
      if (!selectedPlaceId) return;

      const placeDetails = await getPlaceDetails(selectedPlaceId);
      setPlace(placeDetails); // 선택된 장소 상태 업데이트
    };
    fetchPlaceDetails();
  }, [selectedPlaceId, getPlaceDetails]);

  return place ? (
    <Paper
      elevation={3}
      sx={{
        width: 300,
        height: "100%",
        overflowY: "auto",
        borderRadius: 2,
        zIndex: 1000,
        backgroundColor: "white",
      }}
    >
      <img
        src={place.photos[0].getURI({ maxWidth: 300 })}
        alt="Place"
        crossOrigin="anonymous"
        style={{ width: "100%" }}
      />
      <div style={{ padding: 16 }}>
        <h2>{place.displayName}</h2>
        <p>{place.formattedAddress}</p>
        <p>Rating: {place.rating}</p>
      </div>
    </Paper>
  ) : null;
}

export default PlaceWindow;
