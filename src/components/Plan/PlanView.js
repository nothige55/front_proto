import { Paper } from "@mui/material";

function PlanView() {
  return (
    <Paper
      elevation={3}
      sx={{
        width: 300,
        height: "100%",
        overflowY: "auto",
        borderRadius: 2,
        //p: 2,
        zIndex: 1000, // 지도가 덮지 않도록
        backgroundColor: "white",
      }}
    ></Paper>
  );
}

export default PlanView;
