import "./App.css";
import MapComponent from "./components/Map/MapComponent";
import { APIProvider } from "@vis.gl/react-google-maps";
import PlaceSearch from "./components/Search/PlaceSearch";
import PlaceWindow from "./components/Search/PlaceWindow";
import PlanView from "./components/Plan/PlanView";

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function App() {
  return (
    <div>
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
        <MapComponent />
        <div
          style={{
            position: "absolute", // 지도 위에 뜨게
            top: 16,
            left: 16,
            right: "auto",
            bottom: 16,
            zIndex: 1000, // 지도 위로
            display: "flex", // 가로로 배치
            gap: 16, // 컴포넌트 사이 간격
            pointerEvents: "none", // 기본적으로 클릭 이벤트를 차단하지 않음
          }}
        >
          <div style={{ pointerEvents: "auto" }}>
            <PlanView />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16, // 컴포넌트 사이 간격
              pointerEvents: "none", // PlaceSearch와 PlaceWindow는 상호작용 가능
            }}
          >
            <PlaceSearch />
            <PlaceWindow />
          </div>
        </div>
      </APIProvider>
    </div>
  );
}

export default App;

//Place = places.Place // places.AutocompleteSessionToken // google.maps.importLibrary("marker");
