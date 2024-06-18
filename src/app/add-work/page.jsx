'use client';
import { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Paper } from '@mui/material';
const AddWork = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [taskto, setTaskto] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !taskto || !duration) {
      alert('All fields are required');
      return;
    }

    const formData = {
      title,
      description,
      taskto,
      duration,
    };
    console.log(formData)
    try {
      const response = await fetch('http://localhost:3001/api/addWork', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        window.location.href = '/workspace';
      } else {
        console.error('Error uploading work:', data.error);
      }
    } catch (error) {
      console.error('Error uploading work:', error);
    }
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(to bottom, #33ccff 0%, #0066ff 100%)', // Gradient background
    }}>
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center">
            Work Form
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              autoComplete="description"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="taskto"
              label="Task Assigned To"
              name="taskto"
              autoComplete="taskto"
              value={taskto}
              onChange={(e) => setTaskto(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="duration"
              label="Duration"
              name="duration"
              autoComplete="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
    </div>
  );
};

export default AddWork;
