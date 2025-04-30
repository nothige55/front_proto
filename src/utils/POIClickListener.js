function POIClickListener(map, setSelectedPlaceId) {
  const listener = map.addListener("click", (e) => {
    if (e.placeId) {
      e.stop();
      setSelectedPlaceId(e.placeId); // 클릭된 placeId를 Zustand 스토어에 저장
      console.log("clicked POI id:", e.placeId);
    } else {
      setSelectedPlaceId(null); // placeId가 없으면 null로 설정
      console.log("Map clicked, no POI.");
    }
  });

  return { listener };
}

export default POIClickListener;
