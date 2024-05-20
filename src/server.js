const express = require('express')
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const { connectToDB, getDB } = require('./database');
const { log } = require('console');

const port = process.env.PORT || 3000;
<<<<<<< HEAD
const cors = require("cors");
const fs = require('fs');
const multer = require('multer');
const { MongoClient } = require("mongodb");


const uri = "mongodb+srv://mp2702737:JFMewLsSKRwPieXn@grasstoucher.pbajss0.mongodb.net/?retryWrites=true&w=majority&appName=GrassToucher";








const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

app.use(cors());
var corsOptions = {
  origin: '*',
  optionsSucessStatus:200
}

app.use('/static', express.static('images')); // Can access images on react using the server's URL with /static/(img name)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }
});

// db connection
let db;
let allDestination = [], allPics = [], user_name;

const client = new MongoClient(uri);
async function run() {
  const database = client.db('Hawkhacks');
  const destinations = database.collection('Destination');
  const pics = database.collection('Pictures');
  allDestination = await destinations.find().toArray();
  allPics = await pics.find().toArray()
}
run().catch(console.dir);

// connectToDB((err) => { 
//   if (err) {
//     console.log(err)
//   }
//   else {
//     console.log("hello world");
//     db = getDB("Hawkhacks");
//     db.collection("Destination").find().forEach(des => allDestination.push(des))
//     .then(() => {})

//     console.log(allDestination);

//     db.collection("Pictures").find().forEach(des => allPics.push(des))
//     .then(() => {})
//   }
// })  

function findAchiever(building) {
  var res = [];
  allPics.forEach((item) => {
    // console.log(item['name'])
    if (item['name'] == building)
      res.push(item['owner']);
  })
  return res;
}

function findAchievedDes() {
  visited = []
  allPics.forEach((item) => {
    if (item['owner'] == user_name)
      visited.push(item['name'])
  })
  return visited
}

=======

// db connection
let db
let allDestination = []
connectToDB((err) => { 
  if (err) {
    console.log(err)
  }
  else {
    db = getDB()
    db.collection("Destination")
    .find()
    .forEach(pic => allDestination.push(pic))
    .then(() => {
      // console.log('successfully');
      // console.log(allDestination);
    })
  }
})  
>>>>>>> refs/remotes/origin/main

// Testing routes
app.get('/allDestination', (req, res) => {
  db.collection("Destination")
    .find()
    .forEach(pic => allDestination.push(pic))
    .then(() => {
      res.status(200).json(allDestination)
    })
  console.log(allDestination);
})

app.get('/addOne', (req, res) => {
  db.collection("User info")
    .insertOne({username: "UserX"})
    .then(() => {
      res.status(200).send('User added successfully')
    })
    .catch((error) => {
      res.status(500).send('Error added user')
    })
})

// Uses jade to render jade files under `/views`
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Client side static assets will be under the  `/public` folder
// To use them on the pages, like
// `localhsot:3000/images/flute.png` will be linked to `./public/images/flute.png`
app.use(express.static(__dirname + '/public'));

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

<<<<<<< HEAD

app.get('/', (req, res) => {
  res.render("home");
})
=======
// app.get('/', (req, res) => {
//   res.render("home");
// })
>>>>>>> refs/remotes/origin/main

app.get('/api/playGame', (req, res) =>
{
  res.render('playGame', {userid:"helloworld"});
});

<<<<<<< HEAD
app.post('/image', upload.single('file'), function (req, res) {
  res.json({})
})

// Socket stuff
=======

>>>>>>> refs/remotes/origin/main
// Socket stuff
io.on('connection', (socket) =>{
  console.log("A connection!");
  socket.on("userConnected", (arg) =>
    {
      console.log("Client Connected " + arg);
<<<<<<< HEAD
      user_name = arg;
=======

      // Send them the position they need to navigate to
      // var desiredPosition = {DLat : 50.0, DLon : 50.0};
>>>>>>> refs/remotes/origin/main
      // socket.emit("wantedPosition", desiredPosition ); // TODO: Make the function for this on client
    });

  // When a socket requests an update, an upadate will be provided
  socket.on("requestData", (arg) =>
    {
      lat1 = arg['LatiPosition'] * (Math.PI / 180)
      lat2 = arg['desiredLat'] * (Math.PI / 180)
      lon1 = arg['LongPosition'] * (Math.PI / 180)
      lon2 = arg['desiredLon'] * (Math.PI / 180)
<<<<<<< HEAD
      var diffLon = lon2 - lon1;

      var returnedData = {};
=======
      var diffLat = lat2 - lat1;
      var diffLon = lon2 - lon1;

      var returnedData = {};
      // var rad = Math.atan2(diffLon, diffLat);
>>>>>>> refs/remotes/origin/main
      let x = Math.sin(diffLon) * Math.cos(lat2)
      let y = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(diffLon)
      var rad = Math.atan2(x, y)
      var deg = rad*(180/Math.PI);
      deg = (deg + 360) % 360
<<<<<<< HEAD
      console.log('Deg = ', deg)
=======
      console.log(deg)
>>>>>>> refs/remotes/origin/main
      if((337.5 < deg && deg < 361) || (0 < deg && deg < 22.5))
      {
        returnedData = "North";
      }
      else if(22.5 < deg && deg < 67.5)
      {
        returnedData = "North-East";
      }
      else if(67.5 < deg && deg < 112.5)
      {
        returnedData = "East";
      }
      else if(112.25 < deg && deg < 157.5)
      {
        returnedData = "South-East";
      }
      else if(157.5 < deg && deg < 202.5)
      {
        returnedData = "South";
      }
      else if(202.5 < deg && deg < 247.5)
      {
        returnedData = "South-West";
      }
      else if(247.5 < deg && deg < 292.5)
      {
        returnedData = "West";
      }
      else if(292.5 < deg && deg < 337.5)
      {
        returnedData = "North-West";
      }
      else
      {
        returnedData = "East";
      }
<<<<<<< HEAD
      console.log(returnedData);
=======

>>>>>>> refs/remotes/origin/main
      socket.emit("returnedData", returnedData);
    });

  socket.on("requestNewQuest", (arg) =>
    {
      var newQuestInfo = {};
<<<<<<< HEAD
      let newQuest = [], oldQuest = findAchievedDes()
      allDestination.forEach(des => {
        if (!(des in oldQuest) || oldQuest.length >= newQuest.length) {
          newQuest.push(des)
        }
      })

      randomDestination = Math.floor(Math.random() * (newQuest.length - 1));
      
      newQuestInfo['DLat'] = newQuest[randomDestination]['location']['latitude'];
      newQuestInfo['DLon'] = newQuest[randomDestination]['location']['longitude'];
      newQuestInfo['Name'] = newQuest[randomDestination]['name']
=======
      randomDestination = Math.floor(Math.random() * (allDestination.length - 1));
      console.log('RandomDestination = ', randomDestination)
      newQuestInfo['DLat'] = allDestination[randomDestination]['location']['latitude'];
      newQuestInfo['DLon'] = allDestination[randomDestination]['location']['longitude'];
>>>>>>> refs/remotes/origin/main
      socket.emit("newQuest", newQuestInfo);
    });

    socket.on("uploadPicture", (name, owner) => {
      client.db('Hawkhacks').collection("Pictures").insertOne({"name": name, "owner": owner})
      run();
    })

  socket.on("getUserData", (arg) =>{
     // arg is ltierally just an id/name

    var dData = {points:50, name:arg.name, exploredPlaces:["laz", "unionStationToronto", "acceleratorCenter"], photos:["/images/here"] };

    socket.emit("desiredUserData", dData);
  });

<<<<<<< HEAD
  socket.on("requestRankedLeaderboard", (arg) =>
    {
      var tempData = db.collection("User info").find({}).sort({"points":-1}).limit(10);
      socket.emit("rankedLeaderboard", tempData);
    });

  socket.on("getallAchievers", (building_name) => {
    console.log("AAAA")
    socket.emit("allAchievers", findAchiever(building_name));
  })


  socket.on('update-avatar',function(json){
    //variables
    var image = json.data.file;
    var data = image.replace(/^data:image\/\w+;base64,/, '');
    var fileName =  'user'+userid+Date.now() + "image.png";

    //upload to folder
    fs.writeFile("public/" + fileName, data, {encoding: 'base64'}, function(err){


      if(err){

        console.log(err);

      }else{

        //success
        //return image back to js-client
        io.to(socketid).emit('avatar-updated',{valid:'true',message:'success',buffer: data.toString('base64')
                                              });
      }
    });
  });

});
=======
});

>>>>>>> refs/remotes/origin/main
