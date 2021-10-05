const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();


app.use(cors())
app.use(bodyParser.json())

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: '6bf879ed4da54d7f8ba7511074c72f00',
    clientSecret: 'ac03c02e869e4b49a61c0041d99fbe0e',
    refreshToken
  })

  spotifyApi.refreshAccessToken().then(
    function(data) {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      })
    })
    .catch(() =>  {
      res.sendStatus(400)
    })
})



app.post('/login', (req,res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
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


app.listen(3001)