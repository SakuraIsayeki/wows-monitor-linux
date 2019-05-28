const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use('/releases', express.static(__dirname));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
