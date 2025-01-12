import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, TextField, Button, List, ListItem, IconButton, Typography, Box } from "@mui/material";
import { Delete, CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    const response = await axios.get("http://127.0.0.1:5000/tasks");
    setTasks(response.data);
  };

  // Add a new task
  const addTask = async () => {
    if (newTask.trim()) {
      const response = await axios.post("http://127.0.0.1:5000/tasks", { title: newTask });
      setTasks([...tasks, response.data]);
      setNewTask("");
    }
  };

  // Toggle task completion
  const toggleTask = async (id) => {
    await axios.put(`http://127.0.0.1:5000/tasks/${id}`);
    fetchTasks();
  };

  // Delete a task
  const deleteTask = async (id) => {
    await axios.delete(`http://127.0.0.1:5000/tasks/${id}`);
    fetchTasks();
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "white" }}>
      <Typography variant="h4" align="center" gutterBottom>
        📝 Todo App
      </Typography>

      {/* Input Field for New Task */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          variant="outlined"
          label="Add a new task"
          fullWidth
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={addTask}>
          Add
        </Button>
      </Box>

      {/* Task List */}
      <List>
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: "#f5f5f5",
              p: 1,
              mb: 1,
              borderRadius: 1,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer",
                flexGrow: 1,
                mr: 2,
              }}
              onClick={() => toggleTask(task.id)}
            >
              {task.title}
            </Typography>
            <IconButton color={task.completed ? "success" : "default"} onClick={() => toggleTask(task.id)}>
              {task.completed ? <CheckCircle /> : <RadioButtonUnchecked />}
            </IconButton>
            <IconButton color="error" onClick={() => deleteTask(task.id)}>
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>

      {/* Footer */}
      <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 4 }}>
        Im not gonna follow this lol!
      </Typography>
    </Container>
  );
};

export default App;
