import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchRecipes } from "../API/api";
import { Box, Typography, Checkbox, List, ListItemText, Rating, Button,} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import Navbar from "../components/Navbar";
import { useCalorieContext } from "../components/CalorieContext";

interface Recipe {
  id: number;
  name: string;
  description: string;
  image: string;
  caloriesPerServing: number;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: string;
  cookTimeMinutes: string;
  rating: number;
  reviewCount: number;
}

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { addCalories } = useCalorieContext();

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const allRecipes = await fetchRecipes();
        const foundRecipe = allRecipes.find(
          (r: any) => r.id === Number(id)
        );
        setRecipe(foundRecipe || null);
      } catch (err) {
        console.error("Couldn't fetch recipes: ", err);
      } finally {
        setLoading(false);
      }
    };
    getRecipe();
  }, [id]);

  const handleAddCalories = () => {
    if (recipe) {
      addCalories(recipe.caloriesPerServing);
    }
  };

  if (loading) return <Typography variant="h3" textAlign="center" margin="auto">Loading...</Typography>;
  if (!recipe) return <Typography variant="h3">Recipe not found.</Typography>;

  return (
    <div>
      <Navbar />
      <Box sx={{ display: "flex", justifyContent: "center", px: 4, mt: 4 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
            gap: 4,
            maxWidth: "1200px",
            width: "100%",
          }}
        >
          <Box>
            <Typography variant="h3" gutterBottom>
              {recipe.name}
            </Typography>

            <img
              src={recipe.image}
              alt={recipe.name}
              style={{
                width: "100%",
                borderRadius: "12px",
                marginBottom: "1.5rem",
              }}
            />

            <Typography variant="h5" gutterBottom>
              Ingredients
            </Typography>
            <List>
              {recipe.ingredients.map((item, index) => (
                <Box
                  key={index}
                  display="flex"
                  alignItems="center"
                  sx={{ mb: 1 }}
                >
                  <Checkbox />
                  <Typography component="span">{item}</Typography>
                </Box>
              ))}
            </List>

            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              Instructions
            </Typography>
            <List>
              {recipe.instructions.map((step, index) => (
                <ListItemText key={index} sx={{ mb: 1 }}>
                  <Typography>
                    {index + 1}. {step}
                  </Typography>
                </ListItemText>
              ))}
            </List>
          </Box>

          <Box
            sx={{
              p: 3,
              bgcolor: "#f9f9f9",
              borderRadius: "12px",
              boxShadow: 3,
              height: "fit-content",
              position: "relative",
              top: 100,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Recipe Info
            </Typography>

            <Typography sx={{ mb: 1 }}>
              <strong>Calories:</strong> {recipe.caloriesPerServing} cal
            </Typography>

            <Typography sx={{ mb: 1 }}>
              <AccessTimeIcon sx={{ verticalAlign: "middle", mr: 1 }} />
              Prep Time: {recipe.prepTimeMinutes} mins
            </Typography>

            <Typography sx={{ mb: 1 }}>
              <OutdoorGrillIcon sx={{ verticalAlign: "middle", mr: 1 }} />
              Cook Time: {recipe.cookTimeMinutes} mins
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Typography>
                <strong>Rating:</strong>
              </Typography>
              <Rating
                name="read-only-rating"
                value={recipe.rating}
                precision={0.1}
                readOnly
              />
              <Typography>{recipe.reviewCount} reviews</Typography>
            </Box>

            <Button
              onClick={handleAddCalories}
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
            >
              Add Calories
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
