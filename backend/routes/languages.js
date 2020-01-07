const router = require('express').Router();
const mongoose = require('mongoose');
const languages = mongoose.model("language");

router.get('/get', async (req,res) => {
    var data = await languages.find();
    res.json(data);
});

module.exports = router;


