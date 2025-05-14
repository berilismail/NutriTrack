import Navbar from "../components/Navbar";
import React, { useEffect, useState } from 'react';
import { fetchRecipes } from '../API/api';
import RecipeCard from '../components/RecipeCard';
import { Grid } from '@mui/material';
import { useNavigate } from "react-router-dom";

export default function DashboardPage(){
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
      fetchRecipes().then(setRecipes);
    }, []);
    
    const navigate = useNavigate();
    const handleViewDetail = (recipeId: string) => {
        navigate(`/recipes/${recipeId}`);
    };

    return(
        <div>
            <Navbar/>
            <Grid container spacing={2} justifyContent="center">
      {recipes.map((recipe: any) => (
        <div key={recipe.id}>
          <RecipeCard
            name={recipe.name}
            cuisine={recipe.cuisine}
            image={recipe.image}
            calories={recipe.caloriesPerServing}
            onButtonClick={() => handleViewDetail(`${recipe.id}`)}
          />
        </div>
      ))}
    </Grid>
        </div>
    );
}