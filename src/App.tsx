import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import RecipeDetail from './pages/RecipeDetail';
import { CalorieProvider } from './components/CalorieContext';
import Calories from './pages/Calories';
import PlanYourDay from './pages/PlanYourDay';
import LogIn from './components/LogIn';

function App() {
  return (
    <CalorieProvider>
    <div>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/dashboard' element={<DashboardPage/>}/>
        <Route path='/recipes/:id' element={<RecipeDetail/>}></Route>
        <Route path='/plan' element={<PlanYourDay/>}></Route>
        <Route path='/track'element={<Calories/>}></Route>
        <Route path='/log-in' element={<LogIn/>}></Route>
      </Routes>
    </div>
    </CalorieProvider>
  );
}

export default App;
