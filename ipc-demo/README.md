# Electron, express.js and IPC demo

A code snippet to demonstrate Electron with built-in `express` server and IPC between the renderer and main processes.

- clone repo
- `npm install` to get the node modules
- `npm start` to run the code
- `curl  -H "Content-Type: application/json" -XPOST "localhost:57000/download" -d '{"1":"3"}'` to send a message to the UI
