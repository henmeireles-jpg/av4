const express = require('express'); 
const cors = require('cors');
const tasksRouter = require('./routes/tasks');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/tasks', tasksRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
