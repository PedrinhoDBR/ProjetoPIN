const { spawn } = require('child_process');
const ejs = require('ejs');

// Call the Python script and pass arguments
const pythonProcess = spawn('python', ['steam.py', '730', 'world']);
var teste;
// Listen for data from the Python script's stdout
pythonProcess.stdout.on('data', (data) => {
  // The data comes back as a buffer, so convert it to a string
  const data = req.body;
  const child = spawn('python', ['./steam.py','730']);

  child.stdout.on('data', (data) => {
    const result = JSON.parse(data);
    res.send(result);
  });
});