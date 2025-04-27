import "./App.css";
import MapComponent from "./components/MapComponent";
import { APIProvider } from "@vis.gl/react-google-maps";
import PlaceSearch from "./components/PlaceSearch";
import PlaceWindow from "./components/PlaceWindow";

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
            width: 300,
            height: "calc(100vh-16px)",
            display: "flex",
            flexDirection: "column",
            gap: 16, // 컴포넌트 사이에 간격 주고 싶으면
          }}
        >
          <PlaceSearch />
          <PlaceWindow />
        </div>
      </APIProvider>
    </div>
  );
}

export default App;
