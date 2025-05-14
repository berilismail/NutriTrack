import React from 'react';
import { Button, Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { useCalorieContext } from './CalorieContext';

interface RecipeCardProps {
  name: string;
  cuisine: string;
  image: string;
  calories: number;
  onButtonClick?: () => void;
}

export default function RecipeCard({ name, cuisine, image, calories, onButtonClick }: RecipeCardProps) {
    const { addCalories } = useCalorieContext();

    const handleAddCalories = () => {
          addCalories(calories);
      };
  return (
    <Card sx={{ maxWidth: 500, m: 2, minWidth: 400}}>
      <CardMedia
        component="img"
        height="250"
        image={image}
        alt={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {name}
        </Typography>
         <Typography variant='body1' color='text.primary' sx={{my:2}} ><b>Calories Per Serving: </b>{calories} cal</Typography>
         <Typography variant="body2" color="text.secondary">
        {cuisine} Cuisine       
         </Typography>
         <br></br>
         <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
         <Typography><Button onClick={onButtonClick}>View</Button></Typography>
         <Button onClick={handleAddCalories}
         className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add Calories
      </Button></Box>
      </CardContent>
    </Card>
  );
}
