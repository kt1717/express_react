const express = require('express');
// const cors = require('cors');

const app = express();

// app.use(cors());

// app.use(cors({
//     origin: 'http://localhost:3000'
//   }));
app.get("/api", (req,res) => {
    console.log('hihi');
    res.json({"users":["userOne","userTwo","userThree"]});
})

app.listen(5000,()=>{

    console.log("Server Started on port 5000")
})