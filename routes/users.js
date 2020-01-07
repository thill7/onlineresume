const router = require('express').Router();
const axios = require('axios');
const dotenv = require('dotenv').config();

router.get('/get/:username', async (req, res) => {
    var username = req.params.username;
    if(username == undefined || process.env.TOKEN == undefined) {
        res.json({"error":"please provide a 'login' parameter."});
    }
    var userData = await axios.get('https://api.github.com/users/'+username,{headers: {
        'Authorization': 'Bearer ' + process.env.TOKEN
    }});
    res.json(userData.data);
});

module.exports = router;