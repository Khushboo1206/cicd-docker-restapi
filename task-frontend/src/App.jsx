import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Drawer,
  AppBar,
  Toolbar,
  IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const API = "http://127.0.0.1:5000";

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API}/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.log("Backend not connected");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;

    await fetch(`${API}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTask }),
    });

    setNewTask("");
    fetchTasks();
  };

  const deleteTask = async (title) => {
    await fetch(`${API}/tasks/${title}`, { method: "DELETE" });
    fetchTasks();
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "#020617", minHeight: "100vh" }}>

      {/* SIDEBAR */}
      <Drawer variant="permanent" sx={{
        width: 240,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          bgcolor: "#020617",
          color: "white",
          borderRight: "1px solid #1e293b",
          p: 2
        }
      }}>
        <Typography variant="h5" sx={{ mb: 4 }}>⚡ DevTask Pro</Typography>

        <Typography sx={{ mb: 2 }}>📋 All Tasks</Typography>
        <Typography sx={{ mb: 2 }}>⭐ Important</Typography>
        <Typography sx={{ mb: 2 }}>✅ Completed</Typography>
        <Typography>⏳ Pending</Typography>
      </Drawer>

      {/* MAIN AREA */}
      <Box sx={{ flexGrow: 1 }}>

        {/* HEADER */}
        <AppBar position="static" sx={{
          bgcolor: "rgba(2,6,23,0.8)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid #1e293b"
        }}>
          <Toolbar>
            <AssignmentIcon sx={{ mr: 2 }} />
            <Typography variant="h5">Smart Task Manager</Typography>
          </Toolbar>
        </AppBar>

        {/* CONTENT */}
        <Box sx={{ p: 5 }}>

          {/* ADD TASK BOX */}
          <Box sx={{
            display: "flex",
            gap: 2,
            mb: 5,
            background: "rgba(255,255,255,0.05)",
            p: 3,
            borderRadius: 3,
            backdropFilter: "blur(10px)"
          }}>
            <TextField
              fullWidth
              label="Enter new task..."
              variant="outlined"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              sx={{
                input: { color: "white" },
                label: { color: "#94a3b8" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#334155" }
                }
              }}
            />

            <Button
              variant="contained"
              color="success"
              onClick={addTask}
              sx={{ px: 4 }}
            >
              Add
            </Button>
          </Box>

          {/* TASK CARDS */}
          <Grid container spacing={3}>
            {tasks.map((t, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Card sx={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(12px)",
                  borderRadius: 4,
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.1)",
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.03)" }
                }}>
                  <CardContent>
                    <Typography variant="h6">{t.title}</Typography>

                    <IconButton
                      color="error"
                      sx={{ mt: 2 }}
                      onClick={() => deleteTask(t.title)}
                    >
                      <DeleteIcon />
                    </IconButton>

                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

        </Box>
      </Box>
    </Box>
  );
}

export default App;
