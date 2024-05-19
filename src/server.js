const express = require('express')
const app = require('express')();
const server = require('http').createServer(app);
const {Server} = require("socket.io");
const { connectToDB, getDB } = require('./database')
const port = process.env.PORT || 3000;
const cors = require("cors");
const fs = require('fs');
const multer = require('multer');

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
let db
let allDestination = [], allPics = [], user_name
connectToDB((err) => { 
  if (err) {
    console.log(err)
  }
  else {
    db = getDB()
    db.collection("Destination").find().forEach(des => allDestination.push(des))
    .then(() => {})

    db.collection("Pictures").find().forEach(des => allPics.push(des))
    .then(() => {})
  }
})  

function findAchiever(building) {
  allPics.forEach((item) => {
    if (item['Name'] == building)
      return item['Owner']
  })
}

function findAchievedDes() {
  visited = []
  allPics.forEach((item) => {
    if (item['Owner'] == user_name)
      visited.push(item['Name'])
  })
  return visited
}


// Testing routes
app.get('/allDestination', (req, res) => {
  db.collection("Destination")
    .find()
    .forEach(pic => allDestination.push(pic))
    .then(() => {
      res.status(200).json(allDestination)
    })
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


app.get('/', (req, res) => {
  res.render("home");
})

app.get('/playGame', (req, res) =>
{
  res.render('playGame', {userid:"helloworld"});
});

app.post('/image', upload.single('file'), function (req, res) {
  res.json({})
})

  

// Socket stuff
// Socket stuff
io.on('connection', (socket) =>{
  console.log("A connection!");
  socket.on("userConnected", (arg) =>
    {
      console.log("Client Connected " + arg);
      user_name = arg;
      // socket.emit("wantedPosition", desiredPosition ); // TODO: Make the function for this on client
    });

  // When a socket requests an update, an upadate will be provided
  socket.on("requestData", (arg) =>
    {
      lat1 = arg['LatiPosition'] * (Math.PI / 180)
      lat2 = arg['desiredLat'] * (Math.PI / 180)
      lon1 = arg['LongPosition'] * (Math.PI / 180)
      lon2 = arg['desiredLon'] * (Math.PI / 180)
      var diffLon = lon2 - lon1;

      var returnedData = {};
      let x = Math.sin(diffLon) * Math.cos(lat2)
      let y = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(diffLon)
      var rad = Math.atan2(x, y)
      var deg = rad*(180/Math.PI);
      deg = (deg + 360) % 360
      console.log('Deg = ', deg)
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
        returnedData = "oh crap";
      }
      console.log(returnedData);
      socket.emit("returnedData", returnedData);
    });

  socket.on("requestNewQuest", (arg) =>
    {
      var newQuestInfo = {};
      let newQuest = [], oldQuest = findAchievedDes()
      allDestination.forEach(des => {
        if (!(des in oldQuest)) {
          newQuest.push(des)
        }
      })

      randomDestination = Math.floor(Math.random() * (newQuest.length - 1));
      console.log('RandomDestination = ', randomDestination)
      newQuestInfo['DLat'] = newQuest[randomDestination]['location']['latitude'];
      newQuestInfo['DLon'] = newQuest[randomDestination]['location']['longitude'];
      newQuestInfo['Name'] = newQuest[randomDestination]['Name']
      socket.emit("newQuest", newQuestInfo);
    });

    socket.on("uploadPicture", (name, owner) => {
      db.collection("Pictures").insertOne({"name": name, "owner": owner})
    })

  socket.on("getUserData", (arg) =>{
     // arg is ltierally just an id/name

    var dData = {points:50, name:arg.name, exploredPlaces:["laz", "unionStationToronto", "acceleratorCenter"], photos:["/images/here"] };

    socket.emit("desiredUserData", dData);
  });

  socket.on("requestRankedLeaderboard", (arg) =>
    {
      var tempData = db.collection("User info").find({}).sort({"points":-1}).limit(10);
      socket.emit("rankedLeaderboard", tempData);
    });

  socket.on("getallAchievers", (building_name) => {
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
