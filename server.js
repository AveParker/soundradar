const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const lyricsFinder = require("lyrics-finder");
const SpotifyWebApi = require('spotify-web-api-node');
const app = express();



app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'https://soundradar.herokuapp.com/',
    clientId: '6bf879ed4da54d7f8ba7511074c72f00',
    clientSecret: 'ac03c02e869e4b49a61c0041d99fbe0e',
    refreshToken
  })

  spotifyApi.refreshAccessToken().then(
    function(data) {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch(() =>  {
      res.sendStatus(400)
    })
})



app.post('/login', (req,res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'https://soundradar.herokuapp.com/',
    clientId: '6bf879ed4da54d7f8ba7511074c72f00',
    clientSecret: 'ac03c02e869e4b49a61c0041d99fbe0e',
  })


   spotifyApi
  .authorizationCodeGrant(code)
  .then(data => {
    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in,
    })
  })
  .catch(() => {
    console.log(err)
    res.sendStatus(400)
  })
})

app.get('/lyrics', async (req, res) => {
  const lyrics = 
  (await lyricsFinder(req.query.artist, req.query.track)) || "No Lyrics found"
  res.json({  lyrics })
})

const path = require('path');
app.use(express.static(path.join(__dirname, "/client/build")));

app.use((req, res) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/client/build/index.html");
});


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

app.listen(process.env.PORT)