const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const cors = require('cors')

const mongoose = require('mongoose')
mongoose.connect(process.env.MLAB_URI)

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


const User = require('./models/user');
const Exercise = require('./models/exercise');



//create new user 
app.post("/api/exercise/new-user", function(req,res,next){
  
  var username = req.body.username;
  if (username==="") {
    res.json({"error":"username cannot be empty"});
  } else if (username.length>10) {
    res.json({"error":"username should be greater than 10 characters long"});
  } else {
   
    const newUser = new User({
      username
    });

    newUser.save((err, data) => {
      if (err) {
        if (err.name === 'MongoError' && err.code === 11000) { 
          res.json({"error":"username already exists"});
        } else {
          res.json({"error":"error while saving"});
        }
      } else {
        res.json({"username":data.username,"id":data._id});
      }
    }); 
   
  }
  
});



//create new exercise
app.post("/api/exercise/add", function(req,res,next){
  var username = req.body.username;
  var description = req.body.description;
  var duration = req.body.duration;
  var date = req.body.date;
  var userId;

  if (username === "" || description === "" || duration === "") {
    res.json({"error":"Required Field(s) missing."});
  }else if (username.length > 10) {
    res.json({"error":"username should not be greater than 10 characters long"});
  } else if (description.length > 100) {
    res.json({"error":"Description cannot be greater than 100 characters"});
  } else if (isNaN(duration)) {
    res.json({"error":"Duration must be a number"});
  } else if (date !== '' && isNaN(Date.parse(date)) === true) {
    res.json({"error":"Invalid date"});
  } else {
      
    User.findOne({ username }, (err, user) => {
      if (err) {
        res.json({"error":"error while searching"});
      } else if (!user) {
        res.json({"error":"username not found"});
      } else {
        userId = user.id;
        duration = Number(duration);
        if (date === '') {
          date = new Date();
        } else {
          date = Date.parse(date);
        }

        const newExercise = new Exercise({
          userId,
          description,
          duration,
          date,
        });

        newExercise.save((errSave, data) => {
          if (errSave) {
            res.json({"error":"error while saving"});
          } else {
            res.json({"username":username,"userId":data._id,"description":data.description,"duration":data.duration,"date":data.date});
          }
        });
      }
    });
    
  }
  
  
});





// Read Exercise 
app.get('/api/exercise/:log', (req, res) => {
  const username = req.query.username;
  let from = req.query.from;
  let to = req.query.to;
  let limit = req.query.limit;
  let userId;
  const query = {};


  if (username === undefined) {
    res.json({"error":"Required Field(s) missing."});
  } else if (username.length > 10) {
    res.json({"error":"username should be greater than 10 characters long"});
  } else if (from !== undefined && isNaN(Date.parse(from)) === true) {
    res.json({"error":"Invalid date"});
  } else if (to !== undefined && isNaN(Date.parse(to)) === true) {
    res.json({"error":"Invalid date"});
  } else if (limit !== undefined && (isNaN(limit)||Number(limit) < 1)=== true) {
    res.json({"error":"invalid limit"});
  } else {
    
    User.findOne({ username }, (err, user) => {
      if (err) {
        res.json({"error":"error while searching"});
      } else if (!user) {
        res.json({"error":"username not found"});
      } else {
        userId = user.id;
        query.userId = userId;

        if (from !== undefined) {
          from = new Date(from);
          query.date = { $gte: from};
        }

        if (to !== undefined) {
          to = new Date(to);
          to.setDate(to.getDate() + 1); // Add 1 day to include date
          query.date = { $lt: to};
        }

        if (limit !== undefined) {
          limit = Number(limit);
        }

        Exercise.find(query).select('userId description date duration ').limit(limit).exec((errExercise, exercises) => {
          if (err) {
             res.json({"error":"error while searching"});
          } else if (!user) {
            res.json({"error":"exercises not found"});
          } else {
            res.json(exercises);
          }
        });
      }
    });
    
  }
});





// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: 'not found'})
})

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage

  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt')
    .send(errMessage)
})



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
