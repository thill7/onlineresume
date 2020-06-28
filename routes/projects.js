const router = require('express').Router();
const mongoose = require('mongoose');
const projects = mongoose.model("project");
const {google} = require('googleapis');

router.get('/get', async (req,res) => {
    var data = await projects.find();
    var drive = await getDrive();
    var files = await getFiles(drive);
    data = data.map(project => {
        var mediaObject = files.find(f => f.folder == project.mediaFolder);
        project.media = mediaObject ? mediaObject.children : [];
        return project;
    });
    res.json(data);
});

router.get('/media', async(req,res) => {
    var drive = await getDrive();
    var files = await getFiles(drive);
    res.json(files);
});

async function getFiles(drive,files=[],pageToken=null,folderId=process.env.FOLDER_ID,folderName=null) {
    if(folderName != null && files.find(f => f.folder == folderName) == undefined) {
        files.push({
            folder: folderName,
            children: []
        });
    }

    var response = await new Promise((resolve,reject) => {
        drive.files.list({
            fields: 'nextPageToken, files',
            corpora: "allDrives",
            includeItemsFromAllDrives: true,
            includeTeamDriveItems: false,
            q: `'${folderId}' in parents and (mimeType contains 'image' or mimeType contains 'folder' or mimeType contains 'video')`,
            supportsAllDrives: true
            //pageToken: pageToken
        }, (err, res) => {
            if(err) {
                reject(err);
            }
            else {
                resolve(res);
            }
        });
    });

    for(const file of response.data.files) {
        if(file.mimeType == "application/vnd.google-apps.folder") {
            await getFiles(drive,files,null,file.id,file.name);
        }
        else {
            files.find(f => f.folder == folderName).children.push(file);
        }
    }


    if(!response.pageToken) {
        return files;
    }
    else {
        return await getFiles(drive,files,pageToken);
    }
}

function getCredentials() {
    if(process.env.GOOGLE_CREDENTIALS) {
        return JSON.parse(process.env.GOOGLE_CREDENTIALS);
    }
    throw new Error("Unable to load credentials");
}

async function getDrive() {
    const credentials = getCredentials();
    const client = await google.auth.getClient({
        credentials,
        scopes: ['https://www.googleapis.com/auth/drive']
    });

    return google.drive({
        version: 'v3',
        auth: client
    });
}

module.exports = router;