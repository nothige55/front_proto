/* global google */

let markers = []; // 기존 마커를 추적하기 위한 배열

async function CreateMarker(map, places) {
  // 기존 마커 제거
  markers.forEach((marker) => marker.setMap(null));
  markers = []; // 배열 초기화

  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // 새 마커 생성
  places.forEach((place) => {
    const location = place.location;
    const id = place.id;

    const marker = new AdvancedMarkerElement({
      map,
      position: {
        lat: location.lat(),
        lng: location.lng(),
      },
      gmpClickable: true,
    });

    marker.id = id;
    // 새 마커를 배열에 저장
    markers.push(marker);
    console.log(markers[0].id);
  });
}

export default CreateMarker;
