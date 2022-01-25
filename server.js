const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");

require('dotenv').config();

var apiKey = "9e7d1bc2b1c2481d6b6759d2ceb19602-us20"; //Here your API key from Mailchimp

var listID = "a6f0fa06a4"; //Here your list id

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;
    
    const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

    var jsonData = JSON.stringify(data);
    const url="https://us20.api.mailchimp.com/3.0/lists/" + listID;
    const options = {
  method: "POST",
  auth: "yungseo1:"+apiKey
};
//     var options = {
//         url: "https://us20.api.mailchimp.com/3.0/lists/" + listID,
//         method: "POST",
//         headers: {
//             "auth": "anagutjor:" + apiKey
//         },
//         body: jsonData
//     }

//     request(options, function(error, response, body){
//         if(error){
//             res.sendFile(__dirname + "/failure.html");
//         } else {
//             console.log(response.statusCode);
//                 if(response.statusCode === 200){
//                     res.sendFile(__dirname + "/success.html");
//                 } else {
//                     res.sendFile(__dirname + "/failure.html");
//                 }
//         }
//     })
// })

// app.post("/failure", function(req, res){
//     res.redirect("/");
// })

// app.listen(process.env.PORT || 3000, function(){
//     console.log("Server is listening on port 3000");
// })
    const request = https.request(url, options, function(response) {
  if (response.statusCode === 200) {
    res.sendFile(__dirname + "/success.html");
  } else {
    res.sendFile(__dirname + "/failure.html");
  }
  response.on("data", function(data) {
    console.log(JSON.parse(data));
  })
});
request.write(jsonData);
request.end();
});
 
app.post("/failure", function(req, res) {
  res.redirect("/");
});
 
app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000.");
}); 
