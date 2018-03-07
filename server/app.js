var express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/Marlabs');
// app.use(express.static('public'));


// app.get('/', function(req, res) {
//     res.sendFile(__dirname+'/main.html');
// });



var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions));
app.use(bodyParser.json());

var Postchema = mongoose.Schema({
  "from": {
    type:String,
    required:true
  },
  "title":{
    type:String,
    required:true
},
  "description":{
      type:String,
      required:true
},
"comments":{
  type:[String],
},
"like":{
  type:[String],
},
});

var Userchema = mongoose.Schema({
  "username": {
    type:String,
    required:true
  },
  "email":{
    type:String,
    required:true
},
  "password":{
      type:String,
      required:true
},
});
var User = mongoose.model('users',Userchema);
var user_1 = new User({
  "username": "lili",
  "password": "123",
  "email": "jchen163@syr.edu",
    active:true
});
var Post = mongoose.model('posts',Postchema);
// var post_1 = new Post({
//   "from": "lili",
//   "title": "Dinner for today",
//   "description": "Friday Night.",
//   "comments":["this is good"],
//   "like":[],
//     active:true
// });

// var post_2 = new Post({
//   "from": "Jenny",
//   "title": "Leaf Rake",
//   "description": "15-inch steel blade hand saw",
//   "comments":["this is bad"],
//   "like":[],
//     active:true
// });
// user_1.save(function(err){
//     if(!err){
//         console.log("document saved");
//     }
//     else{
//         console.log(err);
//     }
// });
// post_2.save(function(err){
//   if(!err){
//       console.log("document saved");
//   }
//   else{
//       console.log(err);
//   }
// });
// var products = [
//   {
//     "productId": 8,
//     "productName": "Saw",
//     "productCode": "TBX-0022",
//     "releaseDate": "May 15, 2016",
//     "description": "15-inch steel blade hand saw",
//     "price": 11.55,
//     "starRating": 3.7,
//     "imageUrl": "http://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png"
//   },
//   {
//     "productId": 10,
//     "productName": "Video Game Controller",
//     "productCode": "GMG-0042",
//     "releaseDate": "October 15, 2015",
//     "description": "Standard two-button video game controller",
//     "price": 35.95,
//     "starRating": 4.6,
//     "imageUrl": "http://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png"
//   }
// ];




app.post('/authenticate', function(req, res) {
  var db = mongoose.connection;
  console.log(req.body.username);
  console.log(req.body.password);
  db.collection('users').find({ $and:[
    {"username":req.body.username},
    {"password":req.body.password},
]}).toArray(function(err,docs){
  console.log(docs);
    if(!err && docs.length>0) {
      var token = jwt.sign({'uname':req.body.username}, 'marlabs-secret-key', {
        expiresIn: '1h'
      });
      res.send({"logged_user":req.body.username,"loggedIn":true, 'token':token});
      console.log('success');
    }
    else {
      res.send({"loggedIn":false});
      console.log('fail');
    }
});
  // if(req.body.username && req.body.password) {

  //   var token = jwt.sign({'uname':req.body.username}, 'marlabs-secret-key', {
  //     expiresIn: '1h'
  //   });
  //   res.send({"logged_user":req.body.username,"loggedIn":true, 'token':token});
  // } else {
  //   res.send({"loggedIn":false});
  // }
});


app.use(function(req, res, next) {
  var token = req.headers.authorization;
  if(token) {
    if(token=='reg'){
      next();
    }
    else{
    jwt.verify(token, 'marlabs-secret-key', function (err, decoded) {
      if (err) {
        console.log(err);
      } else {
          req.decoded = decoded;
          console.log(req.decoded);
          next();
      }
    });
  }
  } 
  else {
    console.log('no token')
  }
});

app.post('/register', function(req, res) {
  var db = mongoose.connection;
  console.log("req.body");
  db.collection('users').insert(req.body
  ,function(err,docs){
    if(!err) {
        res.send({'info':true});
        console.log('sucess');
    }
    else{
      console.log('error');
    }
});
});
app.get('/getposts', function(req, res) { 
  var db = mongoose.connection;
  
  db.collection('posts').find({}).toArray(function(err,docs){
    if(!err) {
        res.send(docs);
    }
});
});

app.post('/addpost', function(req, res) { 
  var db = mongoose.connection;
  db.collection('posts').insert(req.body,function(err,docs){
    if(!err) {
      res.send(docs);
  }
  })

});

// app.post('/getpost',function(req,res){
//   console.log("req.body");
//   var db = mongoose.connection;
//   db.collection('posts').find({"productCode":req.body.code}).toArray(function(err,docs){
//     if(!err) {
//         res.send(docs);
      
//     }
// });
// });
app.post('/addlike', function(req, res) {
  var db = mongoose.connection;
  db.collection('posts').update({"_id":mongoose.Types.ObjectId(req.body._id)},{$set:{'like':req.body.like}}
  ,function(err,docs){
    if(!err) {
        res.send(docs);
        console.log('sucess');
    }
    else{
      console.log('error');
    }
});
});

app.post('/comment', function(req, res) {
  var db = mongoose.connection;
 
  db.collection('posts').update({"_id":mongoose.Types.ObjectId(req.body._id)},{$set:{'comments':req.body.comments}}
  ,function(err,docs){
    if(!err) {
        res.send(docs);
        console.log('sucess');
    }
    else{
      console.log('error');
    }
});
});

app.listen(2000, function() {
    console.log('Server running @ localhost:2000');
});