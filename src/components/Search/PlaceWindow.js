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

  return (
    <Paper
      elevation={3}
      sx={{
        //position: "absolute",
        top: 16, // 위쪽 간격
        left: 16, // 왼쪽 간격
        bottom: 32, // 아래쪽 간격 추가
        right: 16, // 오른쪽 간격 추가
        width: 268,
        height: "100%",
        // maxHeight: "calc(100vh - 32px)", // 위아래 간격을 고려한 최대 높이
        overflowY: "auto",
        borderRadius: 2,
        p: 2,
        zIndex: 1000, // 지도가 덮지 않도록
        backgroundColor: "white",
      }}
    >
      {place ? (
        <div>
          <h2>{place.displayName}</h2>
          <p>{place.formattedAddress}</p>
          <p>Rating: {place.rating}</p>
          <p>Types: {place.types?.join(", ")}</p>
        </div>
      ) : (
        <p>장소를 선택하세요.</p>
      )}
    </Paper>
  );
}

export default PlaceWindow;
