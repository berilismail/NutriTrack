import { Typography, Button, Box, Card, CardContent } from "@mui/material";
import { useCalorieContext } from "../components/CalorieContext";
import Navbar from "../components/Navbar";

export default function Calories() {
  const { totalCalories, resetCalories } = useCalorieContext();

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "86vh",
          backgroundColor: "#f5f5f5",
          padding: 2,
        }}
      >
        <Card
          sx={{
            maxWidth: 400,
            width: "100%",
            padding: 3,
            borderRadius: 3,
            boxShadow: 3,
            backgroundColor: "white",
          }}
        >
          <CardContent>
            <Typography variant="h4" align="center" sx={{ marginBottom: 2 }}>
              Total Calories Today
            </Typography>
            <Typography
              variant="h5"
              align="center"
              sx={{ fontWeight: "bold", marginBottom: 3 }}
            >
              {totalCalories} cal
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                padding: "12px",
                fontSize: "16px",
                "&:hover": {
                  backgroundColor: "#d32f2f", 
                },
              }}
              onClick={resetCalories}
            >
              Reset Calories
            </Button>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}
