const { spawn } = require('child_process');

// Call the Python script and pass arguments
const pythonProcess = spawn('python', ['steam.py', '730']);
// Listen for data from the Python script's stdout
pythonProcess.stdout.on('data', (data) => {
  // The data comes back as a buffer, so convert it to a string
  result = data.toString()
  console.log(result)
});