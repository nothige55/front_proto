import { useRef } from "react";

function useSessionToken(placeLib) {
  const sessionTokenRef = useRef(null);

  const getSessionToken = () => {
    if (!sessionTokenRef.current && placeLib) {
      sessionTokenRef.current = new placeLib.AutocompleteSessionToken();
      console.log("세션 토큰 생성됨:", sessionTokenRef.current);
    }
    return sessionTokenRef.current;
  };

  const clearSessionToken = () => {
    sessionTokenRef.current = null;
    console.log("세션 토큰 초기화됨");
  };

  return { getSessionToken, clearSessionToken };
}

export default useSessionToken;
