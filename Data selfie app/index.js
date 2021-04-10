const express = require("express");
const Datastore = require('nedb')
const app = express();
app.listen(3000, () => {
  console.log("listening at 3000");
});
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));
const database = new Datastore("database.db");
database.loadDatabase();

//to display data on 'selfie data' option
//routing method(express.js)
app.get('/api',(request,response)=>{
  database.find({},(err,data)=>{
    if(err){ 
      response.end();
      return;
    }
    response.json(data)
  })
})
/*when client send the data to server with its geocoordinates
*client must get a message its succeed */
//routing method(express.js)
//api is an interface where look for information and send response to users
app.post("/api", (request, response) => {
  console.log("i got a request");
  console.log(request.body);
  const data = request.body;
  database.insert(data);
  const timestamp = Date.now();
  data.timestamp = timestamp;
  response.json({
    status: "succeed",
    timestamp: timestamp,
    latitude: data.lat, //bcoz everything is in request.body
    longitude: data.lon,
  });
});
//exporting images


