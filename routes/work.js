const router = require('express').Router();
const mongoose = require('mongoose');
const works = mongoose.model("work");

router.get('/get', async (req,res) => {
    var data = await works.find();
    res.json(data);
});

module.exports = router;