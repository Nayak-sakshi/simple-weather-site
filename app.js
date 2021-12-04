const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.get("/" ,function( res , req ){

  req.sendFile(__dirname + "/index.html");
});

app.post("/" ,function(res , req){


  const query = res.body.cityName
  const apikey = "1069e31cae55394510e5d74af5b73ce4"
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=" + apikey +"&units="+ unit;

  https.get(url ,function(response){
    console.log(response.statusCode);

    response.on("data" , function(data){
      const weatherdata = JSON.parse(data)
      const temp = weatherdata.main.temp
      const dis = weatherdata.weather[0].description
      const icon = weatherdata.weather[0].icon
      const imageurl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
      req.write("<p> the weather is cureently "+ dis + "</p>")
      req.write("<h1> the temperature in "+ query  +" is "+ temp +" degree celcius</h1>")
      req.write("<img src=" +imageurl+">");
      req.send();
    });



  })

});





app.listen(3000 , function(){
  console.log(" server has been started at port 3000")
})
