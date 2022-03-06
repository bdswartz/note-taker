// start express and assign to app variable so that we can use the methods later
const express = require('express');
const app = express();
// assign the PORT from heroku
const PORT = process.env.PORT || 3001;
// include node modules to be used
const fs = require('fs');
const path = require('path');
// include files for server file to use
const { notes } = require('./data/notes');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// parse incoming JSON data
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.get('/api/notes', (req, res) => {
    res.json(notes);
  });

// instantiate the server
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});