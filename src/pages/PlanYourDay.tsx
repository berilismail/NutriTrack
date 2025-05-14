import { useState} from "react";
import { Box, Typography, TextField, Button, List, ListItem, Checkbox, IconButton, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from "../components/Navbar";

type Task = {
  text: string;
  completed: boolean;
};

export default function PlanYourDay() {
  const loadFromStorage = () => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  };

  const [tasks, setTasks] = useState<Task[]>(loadFromStorage());
  const [taskInput, setTaskInput] = useState("");

  const handleAddTask = () => {
    if (!taskInput.trim()) return;

    const newTask = { text: taskInput.trim(), completed: false };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setTaskInput("");

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleToggleComplete = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleDeleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: 3, 
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "86vh",
          padding: 2,
        }}
      >
      <Box sx={{ px: 4, py: 4 }}>
        <Typography variant="h3" gutterBottom textAlign="center">
          Plan Your Day
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            size="small"
            fullWidth
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Add a new task"
          />
          <Button variant="contained" onClick={handleAddTask}>
            Add
          </Button>
        </Box>

        <List>
          {tasks.map((task, index) => (
            <ListItem key={index} sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                checked={task.completed}
                onChange={() => handleToggleComplete(index)}
              />
              <ListItemText
                primary={task.text}
                sx={{
                  textDecoration: task.completed ? "line-through" : "none",
                  opacity: task.completed ? 0.6 : 1,
                }}
              />
              <IconButton edge="end" onClick={() => handleDeleteTask(index)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
      </Box>
    </div>
  );
}
