function POIClickListener(map) {
  let clickedPlaceId = null; // 클릭된 placeId를 저장할 변수

  const listener = map.addListener("click", (e) => {
    if (e.placeId) {
      clickedPlaceId = e.placeId; // placeId 저장
      console.log("clicked POI id:", clickedPlaceId);
    } else {
      clickedPlaceId = null; // placeId가 없으면 null로 설정
      console.log("Map clicked, no POI.");
    }
  }); //지도 클릭시 placeId가 있으면 placeId를 저장하는 리스너 생성

  // listener와 clickedPlaceId를 함께 반환
  return { listener, clickedPlaceId };
}

export default POIClickListener;
