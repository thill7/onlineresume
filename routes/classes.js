const router = require('express').Router();
const mongoose = require('mongoose');
const classData = mongoose.model("classData");

router.get('/', async (req,res) => {
    var data = [];
    try {
        data = await classData.find();
    }
    catch(err) {
        res.json("There was an error retrieving the requested resource.");
    }
    res.json(data);
});

module.exports = router;