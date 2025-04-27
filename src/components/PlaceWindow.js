import React from "react";
import { Paper } from "@mui/material";

function PlaceWindow() {
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
    ></Paper>
  );
}

export default PlaceWindow;
