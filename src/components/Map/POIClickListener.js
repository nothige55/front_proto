function MapClickListener(map) {
  const listener = map.addListener("click", (e) => {
    if (e.placeId) {
      console.log("clicked POI id:", e.placeId);
    } else {
      console.log("Map clicked, no POI.");
    }
  });
  return listener;
}

export default MapClickListener;
