const express = require ('express');
const app = express();
const logger = require('morgan')('dev');
app.use(logger);
app.get('/button/:id', (req, res) => {
  res.json({message: `button ${req.params.id} was pressed`});
});

// specify port on command line, or in the env, or default to 9000
const port = process.argv[2] || process.env.PORT || 9000;

app.listen(port, err => {
  if (err) return console.error(err);
  console.log(`Server started at http://localhost:${port}/`);
});
