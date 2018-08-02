const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const { moongose } = require('./database');

// Settings    
app.set('port', 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

// Routes
app.use('/api/albumBySearch', require('./routes/spotify.routes'))

// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});