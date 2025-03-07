// index.js

// Required modules
var express = require('express');
var app = express();
var moment = require('moment'); // Ensure moment is installed

// Enable CORS
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use(express.static('public'));

// API to handle date input
app.get("/api/:date?", function (req, res) {
  var dateString = req.params.date;
  var dateObj;

  // If no date is provided, use current date
  if (!dateString) {
    dateObj = new Date();
  } else if (/\d{5,}/.test(dateString)) {
    // If the input is a Unix timestamp (number)
    dateObj = new Date(parseInt(dateString));
  } else {
    // If the input is a string (for example, "2015-12-25")
    dateObj = new Date(dateString);
  }

  // Check if the date is valid
  if (dateObj.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Prepare the response
  var unixTimestamp = dateObj.getTime();
  var utcString = dateObj.toUTCString();

  // Return the JSON with unix and utc
  res.json({
    unix: unixTimestamp,
    utc: utcString
  });
});

// Listen on port 3000 or the environment variable port
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
