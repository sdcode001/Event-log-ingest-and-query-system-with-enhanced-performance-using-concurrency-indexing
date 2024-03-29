const express = require('express');
const cors=require('cors')
const {router} = require('./router')

const app = express();
const port = 3000;

app.use(cors({
  origin: '*'
}))

app.use(router)


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
