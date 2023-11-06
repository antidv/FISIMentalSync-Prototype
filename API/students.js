const express = require('express');
const cors = require('cors');
const router = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

const port = 3000;
app.listen(port, () => {
 console.log(`App running on port ${port}`);
});
