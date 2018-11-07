const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect(
  "mongodb://goWeekBlande:adel2323@ds155073.mlab.com:55073/goweekblande", 
  {
    useNewUrlParser: true
  }
);


app.use((req, res, next) => {
  req.io = io;
  return next();
})

app.use(cors());
app.use(express.json());
app.use(require('./routes'))

server.listen(3000, () => {
  console.log('Servidor iniciado na port 3000');
});