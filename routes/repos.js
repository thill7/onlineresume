const router = require('express').Router();
const axios = require('axios');
const mongoose = require('mongoose');
const language = mongoose.model("language");

router.get('/get/most_recent_push', (req,res) => {
    if(process.env.TOKEN == undefined) {
        res.json({"error":"please provide proper authentication."});
    }
    var repos = await axios.get('https://api.github.com/user/repos?per_page=100&sort=pushed',{headers: {
        'Authorization': 'Bearer ' + process.env.TOKEN
      }
    });
    res.json(repos.data);
});

router.get('/get',async (req,res) => {
    if(process.env.TOKEN == undefined) {
        res.json({"error":"please provide proper authentication."});
    }
    var repos = await axios.get('https://api.github.com/user/repos',{headers: {
        'Authorization': 'Bearer ' + process.env.TOKEN
      }
    });
    res.json(repos.data);
});

router.get('/get/languages', async (req,res) => {
    if(process.env.TOKEN == undefined) {
        res.json({"error":"please provide proper authentication."});
    }
    var repos = await axios.get('https://api.github.com/user/repos',{headers: {
        'Authorization': 'Bearer ' + process.env.TOKEN
      }
    });

    var languageDB = await language.find();

    var languageGH = [];

    var requests = [];

    repos.data.forEach(async repo => {
        let url = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/languages`;
        requests.push(
            axios.get(url, {headers: {
                'Authorization': 'Bearer ' + process.env.TOKEN
                }
            })
            .then(response => {
                for(var prop in response.data) {
                    let languageIndex = languageGH.findIndex(l => l.language == prop);
                    if(languageIndex != -1) {
                        languageGH[languageIndex].bytes += response.data[prop];
                    }
                    else {
                        var newLang = {
                            language: prop,
                            bytes: response.data[prop]
                        };
                        languageGH.push(newLang);
                    }
                }
            })
            .catch(err => console.log(err))
        );
    });

    await Promise.all(requests);

    var combinedData = [];

    for(let i = 0; i < languageDB.length; i++) {
        var lang = languageDB[i].toObject();
        combinedData.push(Object.assign(lang,languageGH.find(lgh => lgh.language == lang.language)));
    }

    combinedData.sort((a,b) => b.bytes - a.bytes);

    res.json(combinedData);
});

module.exports = router;