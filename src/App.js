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
          }}
        >
          <div>
            <PlanView />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16, // 컴포넌트 사이 간격
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
