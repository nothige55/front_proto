import React, { useState } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import CreateMarker from "../../utils/createMarker";
import textSearch from "../../utils/textSearch";
import useAutoSuggestion from "../../hooks/useAutoSuggestion";
import useSessionToken from "../../hooks/useSessionToken";
import SearchBox from "./SearchBox";

function PlaceSearch() {
  const [inputValue, setInputValue] = useState("");
  const [sessionToken, setSessionToken] = useState(null); // 세션 토큰 상태 관리
  const placeLib = useMapsLibrary("places");
  const map = useMap();

  const { getSessionToken, clearSessionToken } = useSessionToken(placeLib);

  const suggestions = useAutoSuggestion(inputValue, sessionToken);

  const handleInputChange = (event, value) => {
    setInputValue(value);

    // 입력값이 있을 때만 세션 토큰 생성
    if (value && !sessionToken) {
      const token = getSessionToken();
      setSessionToken(token);
    }
  };

  const handlePlaceSelected = async () => {
    const { places } = await textSearch(inputValue, { Place: placeLib.Place }); //라이브러리 호출 수 줄이기 위해 Place를 인자로 전달 추후에 로직 변경 여부 확인
    console.log("장소 선택됨:", places);
    CreateMarker(map, places);

    // 세션 토큰 초기화
    clearSessionToken();
    setSessionToken(null);
  };

  return (
    <div
      style={{
        zIndex: 1000,
        backgroundColor: "white",
        width: 300,
      }}
    >
      <SearchBox
        suggestions={suggestions}
        onInputChange={handleInputChange}
        onSelected={handlePlaceSelected}
      />
    </div>
  );
}

export default PlaceSearch;
