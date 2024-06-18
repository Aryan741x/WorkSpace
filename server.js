const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('isomorphic-fetch');
const cors = require('cors');
const mongoose = require('mongoose');
const Work = require('./src/app/models/work');
require('dotenv').config();

const app = express();

const MONGODB_URI = process.env.MONGODB_URI;

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to database'))
  .catch((err) => console.error('Failed to connect to database', err));

app.post('/api/login', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const response = await fetch('http://localhost:8181/v1/data/app/rbac/allow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: {
          user: username,
          action: 'login',
          password: password,
          role: role,
        },
      }),
    });

    const data = await response.json();

    if (data.result) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
});


app.post('/api/check', async (req, res) => {
  const { username, actionTaken } = req.body;

  try {
    const response = await fetch('http://localhost:8181/v1/data/app/rbac/allow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: {
          user: username,
          action: actionTaken,
          type: "work",
        },
      }),
    });

    const data = await response.json();

    if (data.result) {
      res.status(200).json({ message: 'Can Perform Action' });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
});


//MogoDb connections here

app.post('/api/addWork', async (req, res) => {
  try {

    const { title, description, taskto, duration } = req.body;

    const newWork = new Work({
      "title": title,
      "description": description,
      "taskto": taskto,
      "duration": duration,
    });

    await newWork.save();

    res.status(200).json({ success: true, data: newWork });
  } catch (error) {
    console.error('Error saving work:', error);
    res.status(500).json({ success: false, error: 'Error saving work' });
  }
})

app.get('/api/listwork', async (req, res) => {
  try {
    const works = await Work.find();
    res.status(200).json({ success: true, data: works });
    console.log(works);
  } catch (error) {
    console.error('Error fetching works:', error);
    res.status(500).json({ success: false, error: 'Error fetching works' });
  }
})

app.delete('/api/deleteWork/:id', async (req, res) => {
  try {
    const work = await Work.findByIdAndDelete(req.params.id);
    if (!work) {
      return res.status(404).json({ success: false, error: 'Work not found' });
    }
    res.json({ success: true, message: 'Work deleted successfully' });
  } catch (error) {
    console.error('Error deleting work:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});


app.put('/api/updateWork/:id', async (req, res) => {
  try {
    const work = await Work.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          taskto: req.body.taskto,
          duration: req.body.duration,
          updatedAt: Date.now(),
          isChecked: req.body.isChecked,
        },
      },
      { new: true }
    );
    if (!work) {
      return res.status(404).json({ success: false, error: 'Work not found' });
    }
    res.json({ success: true, data: work });
  } catch (error) {
    console.error('Error updating work:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});

