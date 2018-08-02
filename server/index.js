const express = require('express');
const app = express();

// Settings
app.set('port', 3000)

// Middlewares

// Routes

// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port 3000');
})