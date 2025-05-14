import axios from 'axios';

export const fetchRecipes = async () => {
  const res = await axios.get('https://dummyjson.com/recipes');
  return res.data.recipes;
};