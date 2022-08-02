const express  = require("express")
const https = require("https")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
  var number1 =Number(req.body.CityName);
  const apikey="a34e8dd7b9b742a3da4426d15f2a8b16";
  const unit="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+number1+"&appid="+apikey+"&units="+unit+"#";

  https.get(url,function(responce){
    // console.log(responce);
    responce.on("data",function(data){
       const weatherData=JSON.parse(data);
       const temp =weatherData.weather[0].description;
       const temp1=weatherData.main.temp;
       const temp2=weatherData.main.humidity;
       const icon=weatherData.weather[0].icon;
       const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
       res.write("<p>The weather is currently "+temp+"</p>");
       res.write("<p>current humidity:"+temp2+"</p>")
       res.write("<img src="+imageURL+ ">");
       res.write("<h1>The temp of india is "+temp1+" degrees celcius</h1>");
       res.send();

    })
  });
});

app.listen(3000, function() {
  console.log("server started no port 3000");
});
