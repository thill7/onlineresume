const router = require('express').Router();
const axios = require('axios');
const dotenv = require('dotenv').config();

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

    var languages = [];

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
                    let languageIndex = languages.findIndex(l => l.language == prop);
                    if(languageIndex != -1) {
                        languages[languageIndex].bytes += response.data[prop];
                    }
                    else {
                        var newLang = {
                            language: prop,
                            bytes: response.data[prop]
                        };
                        languages.push(newLang);
                    }
                }
            })
            .catch(err => console.log(err))
        );
    });

    await Promise.all(requests);

    languages.sort((a,b) => b.bytes - a.bytes);

    res.json(languages);
});

module.exports = router;