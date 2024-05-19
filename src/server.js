const express = require('express')
const app = require('express')();
const server = require('http').createServer(app);
const {Server} = require("socket.io");
const { connectToDB, getDB } = require('./database')
const port = process.env.PORT || 3000;
const cors = require("cors");
const fs = require('fs');
const multer = require('multer');
const { MongoClient } = require("mongodb");


const uri = "mongodb+srv://mp2702737:JFMewLsSKRwPieXn@grasstoucher.pbajss0.mongodb.net/?retryWrites=true&w=majority&appName=GrassToucher";

const client = new MongoClient(uri);
const database = client.db('Hawkhacks');
const DestinationsC = database.collection('Destination');
const PicturesC = database.collection('Pictures');

async function run() {
  try {
    // Query for a movie that has the title 'Back to the Future'
    const query = { "name": "lazaridis" };
    const movie = await DestinationsC.findOne(query);
    console.log(movie.location["longitude"] + "hi");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// all pictures
// all places
// Database code

var myCursor = DestinationsC.find();
var documentArray = myCursor.toArray();



let newQuest = {
  "Destination" :[
    {"_id":{"$oid":"664951d168a9b2c44608dca8"},"name":"lazaridis","location":{"longitude":{"$numberDouble":"43.475111"},"latitude":{"$numberDouble":"80.529417"}}},
    {"_id":{"$oid":"664952c768a9b2c4460a6f2e"},"name":"St. Micheals Roman Church","location":{"longitude":{"$numberDouble":"43.474685"},"latitude":{"$numberDouble":"-80.530373"}}},
    {"_id":{"$oid":"6649541068a9b2c4460c8ccc"},"name":"Engineering 7","location":{"longitude":{"$numberDouble":"43.47303"},"latitude":{"$numberDouble":"-80.539601"}}},
    {"_id":{"$oid":"6649555368a9b2c4460e9f10"},"name":"Beth Jacob Cementary","location":{"longitude":{"$numberDouble":"43.439331"},"latitude":{"$numberDouble":"-80.520268"}}},
    {"_id":{"$oid":"6649561a68a9b2c4460fe4ba"},"name":"Bingermans Big Splash","location":{"longitude":{"$numberDouble":"43.4723"},"latitude":{"$numberDouble":"-80.449998"}}}
  ],

  "Pictures":[
    {"_id":{"$oid":"6649640568a9b2c44626e27a"},"name":"Beth Jacob Cementary.jpg","owner":"Yohwllo"},
    {"_id":{"$oid":"6649644568a9b2c446274ba7"},"name":"Bingermans Big Splash.jpg","owner":"Yohwllo"},
    {"_id":{"$oid":"6649647068a9b2c446279142"},"name":"Engineering 7.jpg","owner":"Yohwllo"},
    {"_id":{"$oid":"6649649768a9b2c44627cf5e"},"name":"Lazardis.jpg","owner":"Yohwllo"},
    {"_id":{"$oid":"664964cd68a9b2c4462827d1"},"name":"St. Micheals Roman Church.jpg","owner":"Yohwllo"}
  ],

  "User info":[
    {"_id":{"$oid":"6649578068a9b2c446123324"},"email":"mp270273@gmail.com","name":"Yohwllo","points":{"$numberInt":"150"}},
    {"_id":{"$oid":"664957d668a9b2c44612c120"},"email":"jacobSmuth@gmail.com","name":"Jacob Smith","points":{"$numberInt":"80"}},
    {"_id":{"$oid":"6649581268a9b2c4461324d8"},"email":"DominosScam@gmail.com","name":"Dominos Scammed","points":{"$numberInt":"10"}},
    {"_id":{"$oid":"6649583568a9b2c446135e2d"},"email":"Joe@gmail.com","name":"Joe Mamam","points":{"$numberInt":"78"}},
    {"_id":{"$oid":"6649585368a9b2c446139029"},"email":"mafia@gmail.com","name":"Ma Fia","points":{"$numberInt":"53"}}
  ]
};





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
      
      // newQuestInfo['DLat'] = newQuest[randomDestination]['location']['latitude'];
      // newQuestInfo['DLon'] = newQuest[randomDestination]['location']['longitude'];
      // newQuestInfo['Name'] = newQuest[randomDestination]['Name']
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
  });



  

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
