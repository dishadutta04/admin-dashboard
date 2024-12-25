const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve courses data
app.get('/api/courses', (req, res) => {
  const query = req.query.search ? req.query.search.toLowerCase() : '';
  fs.readFile(path.join(__dirname, 'courses.json'), 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read courses data' });
    }

    let coursesData = JSON.parse(data);
    
    if (query) {
      coursesData.courses = coursesData.courses.map(category => {
        category.courses = category.courses.filter(course => course.toLowerCase().includes(query));
        return category;
      });
    }

    res.json(coursesData);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:3000`);
});
