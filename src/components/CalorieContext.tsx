import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

const CalorieContext = createContext<{
  totalCalories: number;
  addCalories: (amount: number) => void;
  resetCalories: () => void;
}>({
  totalCalories: 0,
  addCalories: () => {},
  resetCalories: () => {},
});

export const useCalorieContext = () => useContext(CalorieContext);

export const CalorieProvider = ({ children }: { children: ReactNode }) => {
  const [totalCalories, setTotalCalories] = useState<number>(0);
  useEffect(() => {
    const stored = localStorage.getItem("totalCalories");
    if (stored) {
      setTotalCalories(parseInt(stored, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("totalCalories", totalCalories.toString());
  }, [totalCalories]);

  const addCalories = (amount: number) => {
    setTotalCalories((prev) => prev + amount);
  };    

  const resetCalories = () => {
    setTotalCalories(0);
  };


  return (
    <CalorieContext.Provider value={{ totalCalories, addCalories, resetCalories }}>
      {children}
    </CalorieContext.Provider>
  );
};
