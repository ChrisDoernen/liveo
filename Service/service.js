const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(8000, () => console.log('Service started, listening on port 8000.'));
